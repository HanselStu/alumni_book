//引入VueRouter
import VueRouter from 'vue-router'
//引入路由组件
import Login from '../components/Login'
import Main from '../components/Main'
import Edit from '../pages/Edit'
import ClassBook from '../pages/ClassBook'
import MyBook from '../pages/MyBook'
import WriteBook from '../pages/WriteBook'
import ToBook from '../pages/ToBook'
import WritedBook from '../pages/WritedBook'

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
    mode: "history",
    base: 'alumni-book', // 统一前缀（基路径）
    routes: [
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: {
                title: '同学录~登录'
            }
        },
        {
            name: 'main',
            path: '/main',
            component: Main,
            meta: {
                title: '同学录~主页',
                requiresAuth: true
            },
            children: [
                {
                    name: 'edit',
                    path: 'edit',
                    component: Edit,
                    meta: {
                        title: '同学录~编辑',
                        requiresAuth: true
                    },
                }, {
                    name: 'classBook',
                    path: 'classBook',
                    component: ClassBook,
                    meta: {
                        title: '同学录~班级通信录',
                        requiresAuth: true
                    },
                },
                {
                    name: 'writeBook',
                    path: 'writeBook',
                    component: WriteBook,
                    meta: {
                        title: '同学录~待写通信录',
                        requiresAuth: true
                    },
                },
                {
                    name: 'myBook',
                    path: 'myBook',
                    component: MyBook,
                    meta: {
                        title: '同学录~我的同学录',
                        requiresAuth: true
                    },
                },
                {
                    name: 'toBook',
                    path: 'toBook',
                    component: ToBook,
                    meta: {
                        title: '同学录~给TA写同学录',
                        requiresAuth: true
                    },
                },
                {
                    name: 'writedBook',
                    path: 'writedBook',
                    component: WritedBook,
                    meta: {
                        title: '同学录~已写同学录',
                    }
        
                },
            ]
        },
        
        {
            path: '/*',
            redirect: '/login',
        },
    ]
})
//全局前置守卫：初始化时执行、每次路由切换前执行
//to下一个页面 from从那个页面去 next方行 可以给对象参数
router.beforeEach((to, from, next) => {

    const loggedIn = sessionStorage.getItem('user')
    const writeTo = sessionStorage.getItem('writeTo')

    if (to.name === 'login' && loggedIn) {
        // If user logged in and navigates to Login page, redirect to Home page
        next({ name: 'main' });
    } else if (to.meta.requiresAuth && !loggedIn) {
        // If user is not logged in and navigates to a protected page, redirect to Login page
        next({ name: 'login' });
    } else if(to.name === 'toBook' && !writeTo){
        next({ name: 'main' });
    }else{
        next();
    }
});
//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to, from) => {
    //学会这种写法
    document.title = to.meta.title || '同学录~'
})
//暴露router
export default router