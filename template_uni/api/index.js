const loginApi = require('./login/login'); //登录
const homeApi = require('./index/home'); //首页
const warehouseListApi = require('./index/warehouseList'); //仓库列表
const agreementApi = require('./index/agreement'); //隐私政策
const createFirmApi = require('./login/createFirm'); //新用户创建企业
const delFirmChildUserApi = require('./login/delFirmChildUser'); //删除子账号
const addFirmUserApi = require('./login/addFirmUser'); //添加子账号
const firmUserManageApi = require('./login/firmUserManage'); //管理子账号
const joinFirmApi = require('./login/joinFirm'); //加入他人企业
const getAllFirmApi = require('./login/getAllFirm'); //加入他人企业
const auditFirmUserApi = require('./login/auditFirmUser'); //审核子账号
const authorizeAddressApi = require('./login/authorizeAddress'); //审核子账号
const auditFirmUserListApi = require('./login/auditFirmUserList'); //审核子账号列表
const setFirmAdminApi = require('./login/setFirmAdmin'); //设置管理员
const payOrderApi = require('./order/pay'); //支付订单
const createOrderApi = require('./order/createOrder'); //创建订单
const getOrderInfoApi = require('./order/getOrderInfo'); //获取订单信息
const cancelOrderApi = require('./order/cancelOrder'); //取消订单
const getAllOrderApi = require('./order/getAllOrder'); //获取所有订单
const againOrderApi = require('./order/againOrder'); //再次下单
const orderTakeApi = require('./order/orderTake'); //订单收货
const orderReportApi = require('./order/orderReport'); //订单报表
const delOrderApi = require('./order/delOrder'); //删除订单
const addCartApi = require('./goods/addCart'); //添加购物车
const getCartApi = require('./goods/getCart'); //获取购物车
const delCartApi = require('./goods/delCart'); //删除购物车
const getCategoryGoodsApi = require('./goods/categoryGoodsList'); //获取商品分类
const getCategoryCookbookApi = require('./goods/categoryCookbookList'); //获取菜谱信息
const getGoodsListApi = require('./goods/getGoodsList'); //获取商品信息
const searchGoodsApi = require('./goods/searchGoods'); //搜索商品
const getCookbookListApi = require('./goods/getCookbookList'); //获取商品信息
const getDefaultAddressApi = require('./address/getDefaultAddress'); //获取默认地址信息
const getAddressListApi = require('./address/getAddressList'); //获取地址信息
const getUserInfoApi = require('./login/getUserInfo'); //获取用户信息
const saveUserinfoApi = require('./login/saveUserinfo'); //获取用户信息
const setDefaultAddressApi = require('./address/setDefaultAddress'); //获取地址信息
const addAddressApi = require('./address/addAddress'); //添加收获地址
const delAddressApi = require('./address/delAddress'); //删除收获地址
const getFirmAddressApi = require('./address/getFirmAddress'); //删除收获地址
const sendOrderEmailApi = require('./order/sendOrderEmail'); //导出订单
const getToolkitApi = require('./order/getToolkit'); //导出订单
const openBalanceApi = require('./login/openBalance'); //导出订单
const topUpApi = require('./login/topUp'); //导出订单
const switchoverAddressApi = require('./order/switchoverAddress'); //修改收获地址
const getFaqListApi = require('./faq/getFaqList'); //获取常见问题
const getFaqInfoApi = require('./faq/getFaqInfo'); //获取常见问题详情信息
const feedbackApi = require('./faq/feedback'); //获取常见问题
const newGoodsApi = require('./faq/newGoods'); //获取常见问题详情信息
const videoListApi = require('./faq/videoList'); //视频列表
const recruitListApi = require('./recruit/recruitList'); //招聘列表
const jobsListApi = require('./recruit/jobsList'); //求职列表
const saveJobsInfoApi = require('./recruit/saveJobsInfo'); //保存求职信息
const getJobsInfoApi = require('./recruit/getJobsInfo'); //获取求职信息
const applyJobApi = require('./recruit/applyJob'); //应聘
const invoiceInfoApi = require('./finance/invoiceInfo'); //发票申请信息
const saveInvoiceInfoApi = require('./finance/saveInvoiceInfo'); //保存申请信息
const applyInvoiceApi = require('./finance/applyInvoice'); //申请开票
const getInvoiceListApi = require('./finance/getInvoiceList'); //申请开票
const systemApi = require('./login/system'); //系统设置
const getServiceAreaApi = require('./address/getServiceArea'); //获取地服务区域
const walletFlowApi = require('./login/walletFlow'); //钱包流水

module.exports = {
    loginApi,
    homeApi,
    warehouseListApi,
    agreementApi,
    createFirmApi,
    joinFirmApi,
    payOrderApi,
    getOrderInfoApi,
    createOrderApi,
    getAllOrderApi,
    againOrderApi,
    addCartApi,
    getCartApi,
    delCartApi,
    getCategoryGoodsApi,
    getCategoryCookbookApi,
    getGoodsListApi,
    getCookbookListApi,
    getDefaultAddressApi,
    getAddressListApi,
    getUserInfoApi,
    setDefaultAddressApi,
    addAddressApi,
    cancelOrderApi,
    delAddressApi,
    orderTakeApi,
    delOrderApi,
    orderReportApi,
    getFirmAddressApi,
    sendOrderEmailApi,
    getToolkitApi,
    saveUserinfoApi,
    openBalanceApi,
    topUpApi,
    delFirmChildUserApi,
    firmUserManageApi,
    addFirmUserApi,
    getAllFirmApi,
    searchGoodsApi,
    switchoverAddressApi,
    getFaqListApi,
    getFaqInfoApi,
    feedbackApi,
    newGoodsApi,
    videoListApi,
    recruitListApi,
    jobsListApi,
    saveJobsInfoApi,
    getJobsInfoApi,
    auditFirmUserApi,
    setFirmAdminApi,
    auditFirmUserListApi,
    authorizeAddressApi,
    invoiceInfoApi,
    saveInvoiceInfoApi,
    applyInvoiceApi,
    getInvoiceListApi,
    applyJobApi,
    systemApi,
    getServiceAreaApi,
    walletFlowApi
};
