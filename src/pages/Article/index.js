// render用于处理复杂的数据渲染(处理一列)，参数为当前行的数据，相当于vue的 scope
// cover数据段不存在则使用img404
// params后端请求的参数，反正是对象，可以增加字段：
// fetchArticleList首次请求和onSearch筛选请求（需要拼接首次请求的字段）

// 筛选请求：可以在组件都渲染完成之后（用户操作）请求数据，
// 不是像首次请求那样可能会和渲染组件冲突（才异步的），这里直接同步即可，因为没有其他事情要做了

// pagination分页功能的实现,antdess的分页和行管理真是有手就行
// from.item表单中的name：其或者其子组件的value，形成一对键值在from的onFinish可以获取到

// useSearchParams：url传参，不需要配置路由表：id，取参使用useSearchParams即可

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Popconfirm,
} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import img404 from '@/assets/error.png'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { http } from '@/utils/Http'
// import './index.scss'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  const [channels, setChannels] = useState([])
  const [article, setArticleList] = useState({
    list: [],
    count: 0,
  })
  const [params, setParams] = useState({
    page: 1,
    per_page: 5,
  })
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: '发布时间', 
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => navigate(`/publish?id=${data.id}`)}
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => delArticle(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  // 筛选请求
  const onSearch = (e) => {
    // console.log(e)
    const { status, channel_id, date } = e
    // 格式化表单数据
    const _params = {}
    // 格式化status
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params参数 触发接口再次发起
    setParams({
      ...params,
      ..._params,
    })
  }

  const pageChange = (e) => {
    setParams({
      ...params,
      page: e,
    })
    // console.log(e)
  }
  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    setParams({
      ...params,
      // page: 1,
      // per_page: 5
    })
    console.log(data)
  }
  // 单选菜单数据请求
  useEffect(() => {
    ;(async function fetchChannels() {
      const res = await http.get('/channels')
      // console.log(res)
      setChannels(res.data.channels)
    })()
  }, [])
  // 首次请求
  useEffect(() => {
    ;(async function fetchArticleList() {
      const res = await http.get('/mp/articles', { params })
      const { results: list, total_count: count } = res.data
      setArticleList({ list, count })
      console.log({ list, count })
    })()
  }, [params])

  return (
    <div>
      <Card
        title={
          // 面包屑
          <Breadcrumb
            separator=">"
            items={[{ title: <Link to="/">首页</Link> }, { title: '内容管理' }]}
          ></Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: undefined }} onFinish={onSearch}>
          <Form.Item label="状态" name="status">
            {/* 单选框 */}
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          {/* 下拉菜单 */}
          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              // defaultValue="lucy"
              style={{ width: 120 }}
            >
              {channels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
        <Table
          pagination={{
            position: ['bottomCenter'],
            current: params.page,
            pageSize: params.per_page,
            total: article.count,
            onChange: pageChange,
          }}
          rowKey="id"
          columns={columns}
          dataSource={article.list}
        />
      </Card>
    </div>
  )
}

export default Article
