<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.userId" clearable class="filter-item" style="width: 160px;" placeholder="请输入用户ID" />
      <el-input v-model="listQuery.orderId" clearable class="filter-item" style="width: 160px;" placeholder="请输入订单ID" />
      <el-input v-model="listQuery.orderSn" clearable class="filter-item" style="width: 160px;" placeholder="请输入订单编号" />
      <el-date-picker v-model="listQuery.timeArray" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" class="filter-item" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" />
      <el-select v-model="listQuery.orderStatusArray" multiple style="width: 200px" class="filter-item" placeholder="请选择订单状态">
        <el-option v-for="(key, value) in statusMap" :key="key" :label="key" :value="value" />
      </el-select>
      <el-button v-permission="['GET /admin/order/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" min-width="100" label="订单编号" prop="orderSn" />

      <el-table-column align="center" label="用户ID" prop="userId" />

      <el-table-column align="center" label="用户名" prop="consignee" />

      <el-table-column align="center" label="订单状态" prop="orderStatus">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderStatus | orderStatusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单金额" prop="orderPrice" />

      <el-table-column align="center" label="支付金额" prop="actualPrice" />

      <el-table-column align="center" label="支付时间" prop="payTime" />

<!--      <el-table-column align="center" label="物流单号" prop="shipSn" />-->

<!--      <el-table-column align="center" label="物流渠道" prop="shipChannel" />-->

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['GET /admin/order/detail']" type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
<!--          <el-button v-permission="['POST /admin/order/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>-->
          <el-button v-if="scope.row.orderStatus==201" v-permission="['POST /admin/order/ship']" type="primary" size="mini" @click="handleShip(scope.row)">发货</el-button>
          <el-button v-if="scope.row.orderStatus==202||scope.row.orderStatus==204" v-permission="['POST /admin/order/refund']" type="primary" size="mini" @click="handleRefund(scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 订单详情对话框 -->
    <el-dialog :visible.sync="orderDialogVisible" title="订单详情" width="800">
      <section ref="print">
        <el-form :data="orderDetail" label-position="left">
          <el-form-item label="订单编号">
            <span>{{ orderDetail.order.orderSn }}</span>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-tag>{{ orderDetail.order.orderStatus | orderStatusFilter }}</el-tag>
          </el-form-item>
          <el-form-item label="订单用户">
            <span>{{ orderDetail.user.nickname }}</span>
          </el-form-item>
          <el-form-item label="用户留言">
            <span>{{ orderDetail.order.message }}</span>
          </el-form-item>
          <el-form-item label="收货信息">
            <span>（收货人）{{ orderDetail.order.consignee }}</span>
            <span>（手机号）{{ orderDetail.order.mobile }}</span>
            <span>（楼栋号）{{ orderDetail.order.building }}</span>
            <span>（地址）{{ orderDetail.order.address }}</span>
          </el-form-item>
          <el-form-item label="商品信息">
            <el-table :data="orderDetail.splitOrders" fit highlight-current-row>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table :data="props.row.orderGoods">
                    <el-table-column align="center" label="商品名称" prop="goodsName" />
                    <el-table-column align="center" label="商品编号" prop="goodsSn" />
                    <el-table-column align="center" label="货品规格" prop="specifications" />
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column align="center" label="商店名称" prop="brandVo.name" />
              <el-table-column align="center" label="订单号" prop="orderSplit.orderSn" />
              <el-table-column align="center" label="用户名" prop="orderSplit.consignee" />
              <el-table-column align="center" label="电话" prop="orderSplit.mobile" />
              <el-table-column align="center" label="地址" prop="orderSplit.address" />
            </el-table>
          </el-form-item>
          <el-form-item label="费用信息">
            <span>
              (实际费用){{ orderDetail.order.actualPrice }}元 =
              (商品总价){{ orderDetail.order.goodsPrice }}元 +
              (快递费用){{ orderDetail.order.freightPrice }}元 -
              (优惠减免){{ orderDetail.order.couponPrice }}元 -
              (积分减免){{ orderDetail.order.integralPrice }}元
            </span>
          </el-form-item>
          <el-form-item label="支付信息">
            <span>（支付渠道）微信支付</span>
            <span>（支付时间）{{ orderDetail.order.payTime }}</span>
          </el-form-item>
          <el-form-item label="退款信息">
            <span>（退款金额）{{ orderDetail.order.refundAmount }}元</span>
            <span>（退款类型）{{ orderDetail.order.refundType }}</span>
            <span>（退款备注）{{ orderDetail.order.refundContent }}</span>
            <span>（退款时间）{{ orderDetail.order.refundTime }}</span>
          </el-form-item>
          <el-form-item label="收货信息">
            <span>（确认收货时间）{{ orderDetail.order.confirmTime }}</span>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="printOrder">打 印</el-button>
      </span>
    </el-dialog>

    <!-- 发货对话框 -->
    <el-dialog :visible.sync="shipDialogVisible" title="发货">
      <el-form ref="shipForm" :model="shipForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="快递公司" prop="shipChannel">
          <el-select v-model="shipForm.shipChannel" placeholder="请选择">
            <el-option v-for="item in channels" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="快递编号" prop="shipSn">
          <el-input v-model="shipForm.shipSn" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shipDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmShip">确定</el-button>
      </div>
    </el-dialog>

    <!-- 退款对话框 -->
    <el-dialog :visible.sync="refundDialogVisible" title="退款">
      <el-form ref="refundForm" :model="refundForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="退款金额" prop="refundMoney">
          <el-input v-model="refundForm.refundMoney" :disabled="true" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRefund">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { detailOrder, listOrder, refundOrder, deleteOrder, shipOrder } from '@/api/order'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import checkPermission from '@/utils/permission' // 权限判断函数

const statusMap = {
  101: '未付款',
  102: '用户取消',
  103: '系统取消',
  201: '已付款',
  202: '申请退款',
  203: '已退款',
  301: '已发货',
  401: '用户收货',
  402: '系统收货'
}

export default {
  name: 'Order',
  components: { Pagination },
  filters: {
    orderStatusFilter(status) {
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined,
        name: undefined,
        timeArray: [],
        orderStatusArray: [],
        sort: 'add_time',
        order: 'desc',
        orderId:undefined
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      statusMap,
      orderDialogVisible: false,
      orderDetail: {
        order: {},
        user: {},
        splitOrders: []
      },
      shipForm: {
        orderId: undefined,
        shipChannel: undefined,
        shipSn: undefined
      },
      shipDialogVisible: false,
      refundForm: {
        orderId: undefined,
        refundMoney: undefined
      },
      refundDialogVisible: false,
      downloadLoading: false,
      channels: []
    }
  },
  created() {
    this.getList()
    //this.getChannel()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      if (this.listQuery.timeArray && this.listQuery.timeArray.length === 2) {
        this.listQuery.start = this.listQuery.timeArray[0]
        this.listQuery.end = this.listQuery.timeArray[1]
      } else {
        this.listQuery.start = null
        this.listQuery.end = null
      }
      if(this.listQuery.orderId){
        detailOrder(this.listQuery.orderId).then(response => {
          this.list = [];
          if(response.data.data.order){
            this.list.push(response.data.data.order);
            this.total = 1;
            this.listLoading = false
          }
        }).catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
      }else{
        listOrder(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        }).catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      detailOrder(row.id).then(response => {
        this.orderDetail = response.data.data
      })
      this.orderDialogVisible = true
    },
    handleShip(row) {
      this.shipForm.orderId = row.id
      this.shipForm.shipChannel = row.shipChannel
      this.shipForm.shipSn = row.shipSn

      this.shipDialogVisible = true
      this.$nextTick(() => {
        this.$refs['shipForm'].clearValidate()
      })
    },
    confirmShip() {
      this.$refs['shipForm'].validate((valid) => {
        if (valid) {
          shipOrder(this.shipForm).then(() => {
            this.shipDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '确认发货成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
        }
      })
    },
    handleDelete(row) {
      deleteOrder({ orderId: row.id }).then(() => {
        this.$notify.success({
          title: '成功',
          message: '订单删除成功'
        })
        this.getList()
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    },
    handleRefund(row) {
      this.refundForm.orderId = row.id
      this.refundForm.refundMoney = row.actualPrice

      this.refundDialogVisible = true
      this.$nextTick(() => {
        this.$refs['refundForm'].clearValidate()
      })
    },
    confirmRefund() {
      this.$refs['refundForm'].validate((valid) => {
        if (valid) {
          refundOrder(this.refundForm).then(() => {
            this.refundDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '确认退款成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['订单ID', '订单编号', '用户ID', '订单状态', '收货人', '收货联系电话', '收货地址']
        const filterVal = ['id', 'orderSn', 'userId', 'orderStatus','consignee', 'mobile', 'address']
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '订单信息')
        this.downloadLoading = false
      })
    },
    printOrder() {
      this.$print(this.$refs.print)
      this.orderDialogVisible = false
    }
  }
}
</script>
