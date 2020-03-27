import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons'
const menuList = [{
        title: '首页',
        key: 'home',
        icon: HomeOutlined,
        path:'/admin/home'
    },
    {
        title: '商品',
        key: 'prod_about',
        icon: AppstoreOutlined,
        children: [{
                title: '品类管理',
                key: 'category',
                icon: BarsOutlined,
                path: '/admin/prod_about/category'
            },
            {
                title: '商品管理',
                key: 'product',
                icon: ToolOutlined,
                path: '/admin/prod_about/product'
            },
        ]
    },

    {
        title: '用户管理',
        key: 'user',
        icon: UserOutlined,
        path: '/admin/user'
    },
    {
        title: '角色管理',
        key: 'role',
        icon: SafetyOutlined,
        path: '/admin/role'
    },

    {
        title: '图形图表',
        key: 'charts',
        icon: AreaChartOutlined,
        children: [{
                title: '柱形图',
                key: 'bar',
                icon: BarChartOutlined,
                path: '/admin/charts/bar'
            },
            {
                title: '折线图',
                key: 'line',
                icon: LineChartOutlined,
                path: '/admin/charts/line'
            },
            {
                title: '饼图',
                key: 'pie',
                icon: PieChartOutlined,
                path: '/admin/charts/pie'
            },
        ]
    },
]

export default menuList