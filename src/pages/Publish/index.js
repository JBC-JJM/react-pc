// jsx支持在那些可以承载对象的地方加标签，比如：Card的titile属性是一个对象，这个对象可以使用标签
// ReactQuill react的富文本编辑器,当他在ant的from中时，可以直接被from控制他的内容（受控表单就不用写了）

// Upload上传组件：showUploadList：显示已上传的文件，action：上传的接口，
// fileList：受控列表(图片地址),onChange上传中的返回值（每次改变都执行，完全上传后有三次返回，因为是一点一点的上传）
// cacheImgList:ref除了获取组件外还可以作为暂存仓库，在组件更新中不会消除，且更新不会触发组件的重新渲染。

// setFieldsValue：from的回显方法，将数据放入from中后，默认是源数据（引用）

// articleId:判断是否是编辑页面跳转过来的（会有id），是就改
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState, useRef } from 'react'
import { http } from '@/utils/Http'

const { Option } = Select

const Publish = () => {
  const navigate = useNavigate()
  const [fileList, setFileList] = useState([])
  const cacheImgList = useRef([])
  const form = useRef(null)
  // 由于react不会监控到（或者说忽视）e细小的变化，所以不会调用onchange多次，
  // 因而要使用setFileList监控fileList的变化
  // const onUploadChange = ({ fileList }) => {
  //   console.log(fileList)
  //   setFileList(fileList)
  // }
  const onUploadChange = (info) => {
    const formatList = info.fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        }
      }
      return file
    })
    setFileList(formatList)
    console.log(formatList)
    cacheImgList.current = formatList
  }

  const [imgCount, setImgCount] = useState(1)
  const radioChange = (e) => {
    // console.log(e)
    const count = e.target.value
    setImgCount(count)
    if (count === 1) {
      // 单图，只展示第一张
      const firstImg = cacheImgList.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      // 三图，展示所有图片
      setFileList(cacheImgList.current)
    }
  }

  const [params] = useSearchParams()
  const articleId = params.get('id')
  const onFinish = async (e) => {
    const { channel_id, content, title, type } = e
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map((item) => item.url),
      },
    }
    if (articleId) {
      await http.put(`/mp/articles/${articleId}?draft=false`, params)
    } else {
      await http.post('/mp/articles?draft=false', params)
    }
    navigate('/article')
    message.success(`${articleId ? '修改成功' : '分布成功'}`)
  }

  const [channels, setChannels] = useState([])
  useEffect(() => {
    ;(async function fetchChannels() {
      const res = await http.get('/channels')
      // console.log(res.data)
      setChannels(res.data.channels)
    })()
  }, [])
  // 数据回显，要注意需要更新的数据有那些
  // 比如from只会更新一些from表单，而图片列表的url和缓存图片还有图片最大数量需要自己额外更新
  useEffect(() => {
    ;(async () => {
      if (articleId) {
        const res = await http.get(`/mp/articles/${articleId}`)
        const { cover, ...formValue } = res.data
        form.current.setFieldsValue({ ...formValue, type: cover.type })
        // console.log(res.data)
        const fileList = cover.images.map((item) => ({ url: item }))
        setFileList(fileList)
        cacheImgList.current = fileList
        //图片最大数量跟新为返回的，而不是组件初始化的！！！
        setImgCount(cover.type)
      }
    })()
  }, [articleId])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            separator=">"
            items={[
              { title: <Link to="/">首页</Link> },
              { title: articleId ? '修改文章' : '发布文章' },
            ]}
          ></Breadcrumb>
        }
      >
        <Form
          ref={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '修改文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
