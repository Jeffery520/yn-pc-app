<template>
	<el-dialog
		top="7vh"
		custom-class="add-message-dialog"
		:width="$route.params.id ? '800px' : '85vw'"
		:title="$t('others.addMessage')"
		:visible.sync="addMessageVisible"
		@close="dialogClose"
	>
		<div
			class="add-message-scroll"
			style="height:90vh;overflow-y: scroll;padding:20px;"
		>
			<!--			<el-form-->
			<!--				class="add-message-header"-->
			<!--				ref="form"-->
			<!--				:model="form"-->
			<!--				:inline="true"-->
			<!--			>-->
			<!--				<div>-->
			<!--										<el-form-item label-width="70px">-->
			<!--											<el-select v-model="form.type">-->
			<!--												<el-option-->
			<!--													v-for="item in typeOptions"-->
			<!--													:key="item.label"-->
			<!--													:label="item.label"-->
			<!--													:value="item.value"-->
			<!--												></el-option>-->
			<!--											</el-select>-->
			<!--										</el-form-item>-->
			<!--					<el-form-item :label="$t('others.filtBy')">-->
			<!--						<el-select v-model="form.filtBy">-->
			<!--							<el-option-->
			<!--								v-for="item in filtOptions[form.type]"-->
			<!--								:key="item"-->
			<!--								:label="item"-->
			<!--								:value="item"-->
			<!--							></el-option>-->
			<!--						</el-select>-->
			<!--					</el-form-item>-->
			<!--				</div>-->
			<!--				<div>-->
			<!--					<span style="line-height: 36px;font-size: 18px;color: #000;"-->
			<!--						>{{ $t('others.arange') }}:</span-->
			<!--					>-->
			<!--					<el-form-item :label="$t('others.from')">-->
			<!--						<el-input v-model="form.name"></el-input>-->
			<!--					</el-form-item>-->
			<!--					<el-form-item :label="$t('others.to')">-->
			<!--						<el-input v-model="form.name"></el-input>-->
			<!--					</el-form-item>-->
			<!--					<el-form-item>-->
			<!--						<el-button type="primary">{{ $t('action.search') }}</el-button>-->
			<!--					</el-form-item>-->
			<!--				</div>-->
			<!--			</el-form>-->
			<div
				v-if="!$route.params.id"
				style="width: 620px;float: right;margin-bottom: 20px"
			>
				<el-input
					style="width: 100% !important;"
					:placeholder="
						$t('notice.searchTipsStart') +
							' ' +
							$t('user.userName') +
							' / ' +
							$t('user.phoneNumber') +
							' / ' +
							$t('tableTitle.IMEI') +
							' ' +
							$t('notice.searchTipsEnd')
					"
					v-model="search"
					@keyup.enter.native="searchDevices"
				>
					<el-button slot="append" @click="searchDevices">{{
						$t('action.search')
					}}</el-button>
				</el-input>
			</div>

			<!--    表格内容-->
			<div v-if="!$route.params.id" class="add-message-table">
				<el-table
					ref="table"
					highlight-current-row
					:header-cell-style="_tableHeaderColor"
					:cell-style="_tableCellColor"
					:row-class-name="_tabRowClassName"
					:data="tableData"
					height="62vh"
					border
					style="width: 100%;"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"> </el-table-column>
					<!--					<el-table-column-->
					<!--						:resizable="false"-->
					<!--						:label="$t('tableTitle.no')"-->
					<!--						width="80"-->
					<!--					>-->
					<!--						<template slot-scope="scope">-->
					<!--							<span>{{-->
					<!--								parseInt(pageSize * (currentPage - 1) + scope.$index + 1)-->
					<!--							}}</span>-->
					<!--						</template>-->
					<!--					</el-table-column>-->
					<el-table-column
						:resizable="false"
						prop="fDeviceType"
						:label="$t('tableTitle.modelNo')"
						width="80"
					>
						<template slot-scope="scope">
							<span>
								{{
									scope.row.fDeviceType == 1
										? 'T9'
										: scope.row.fDeviceType == 4097
										? 'T9S'
										: scope.row.fDeviceType == 4098
										? 'R02'
										: scope.row.fDeviceType == 4099
										? 'R03'
										: '—'
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						:resizable="false"
						prop="fFullname"
						:label="$t('user.userName')"
						width="120"
					>
						<template slot-scope="scope">
							<el-popover
								placement="right"
								trigger="hover"
								popper-class="user-photo-popover"
							>
								<div slot="reference">
									<span v-if="scope.row.fFullname">{{
										scope.row.fFullname
									}}</span>
									<span v-else style="color: #aaa;">—</span>
								</div>
								<el-avatar
									class="user-photo"
									:size="100"
									:src="scope.row.fHead"
								></el-avatar>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column
						:resizable="false"
						prop="fPhone"
						:label="$t('user.phoneNumber')"
						width="180"
					>
						<template slot-scope="scope">
							<span
								@click="
									$store.getters.userInfo.resource.indexOf(8) > -1
										? callPhone(_formatPhone(scope.row.fPhone))
										: ''
								"
								>{{ _formatPhone(scope.row.fPhone) }}</span
							>
						</template>
					</el-table-column>
					<el-table-column
						:resizable="false"
						prop="fAddress"
						width="180"
						:label="$t('user.address')"
					></el-table-column>

					<el-table-column
						:resizable="false"
						prop="fDeviceImei"
						:label="$t('tableTitle.IMEI')"
						width="160"
					></el-table-column>
					<el-table-column
						:resizable="false"
						prop="fDeviceImsi"
						width="160"
						:label="$t('tableTitle.IMSI')"
					></el-table-column>
					<el-table-column
						:resizable="false"
						prop="fOrgName"
						:label="$t('tableTitle.org')"
					></el-table-column>
					<el-table-column
						:resizable="false"
						prop="fSaveTime"
						:label="$t('tableTitle.lastReportedTime')"
						width="120"
					></el-table-column>
					<el-table-column
						:resizable="false"
						width="130"
						prop="subServiceList"
						:label="$t('tableTitle.subscription')"
					>
						<template slot-scope="scope">
							<el-dropdown>
								<span class="el-dropdown-link">
									<span
										v-if="
											scope.row.subServiceList.length > 0 &&
												scope.row.subServiceList[0].name
										"
										>{{ scope.row.subServiceList[0].name }}</span
									>
									<span v-else style="color: #aaa;">—</span>
									<i
										v-if="scope.row.subServiceList.length > 0"
										class="el-icon-arrow-right"
									></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item
										v-for="item in scope.row.subServiceList"
										:key="item.name"
										:command="item.serviceId"
									>
										<span v-if="item.name">{{ item.name }}</span>
										<span v-else style="color: #aaa;">—</span>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
					<el-table-column
						:resizable="false"
						prop="bindUserList"
						:label="$t('tableTitle.authorisedPersonnels')"
						width="110"
					>
						<template slot-scope="scope">
							<el-dropdown>
								<span class="el-dropdown-link">
									<span
										v-if="
											scope.row.bindUserList.length > 0 &&
												scope.row.bindUserList[0].fUserAlias
										"
										>{{ scope.row.bindUserList[0].fUserAlias }}</span
									>
									<span v-else style="color: #aaa;">—</span>
									<i class="el-icon-arrow-right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item
										v-for="item in scope.row.bindUserList"
										:key="item.fUid"
										:command="item.fUid"
									>
										<span v-if="item.fUserAlias">{{ item.fUserAlias }}</span>
										<span v-else style="color: #aaa;">—</span>
									</el-dropdown-item>
									<!--								<el-dropdown-item-->
									<!--									:command="scope.row"-->
									<!--									icon="el-icon-plus"-->
									<!--									divided-->
									<!--									>Add a new one</el-dropdown-item-->
									<!--								>-->
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<div
					v-if="addMessageVisible && !$route.params.id"
					style="display: flex;justify-content: flex-end;"
				>
					<Pagination
						ref="Pagination"
						:currentPage="currentPage"
						@currentChange="pageChange"
					></Pagination>
				</div>
			</div>
			<!--    表格内容-->
			<div class="footer-bg">
				<message-settings
					ref="MessageSettings"
					:selectDidList="selectDidList"
				></message-settings>
			</div>
			<phone-call ref="phoneCall"></phone-call>
		</div>
	</el-dialog>
</template>

<script>
import mixin from '@/views/mixin';
import { formatDateToStr, _debounce } from '@/utils/validate';
import Pagination from '@/components/Pagination/index.vue';
import { getDevicesList } from '@/api/devices';
const MessageSettings = () => import('@/components/AddMessage/MessageSettings');

export default {
	name: 'AddMessage',
	mixins: [mixin],
	components: { MessageSettings, Pagination },
	data() {
		return {
			addMessageVisible: false,
			search: '',
			currentPage: 1,
			selectDidList: this.$route.params.id ? [this.$route.params.id] : [],
			tableData: [],
			form: {
				type: 'App',
				filtBy: '',
				name: '',
				phone: '',
				date: '',
				time: '',
				content: '',
				repeatType: '',
				repeat: []
			},
			typeOptions: [
				{
					label: 'App',
					value: 'App'
				},
				{
					label: 'Device',
					value: 'Device'
				}
			],
			filtOptions: {
				App: ['Phone Number', 'User ID', 'User Name'],
				Device: [
					'User ID',
					'User Name',
					"Device's IMSI",
					"Device's IMEI",
					'Organization',
					'Area',
					'Age'
				]
			}
		};
	},
	mounted() {
		if (this.addMessageVisible && !this.$route.params.id) {
			this._getDevicesList();
		}
	},
	watch: {
		addMessageVisible(newV) {
			if (newV && !this.$route.params.id) {
				this._getDevicesList();
			}
		}
	},
	methods: {
		dialogClose() {
			if (this.loading) {
				this.loading.close();
			}
		},
		callPhone(phone) {
			if (!this.$refs.phoneCall.isHangUp) {
				this.$alert(
					this.$store.getters.language == 'zh'
						? '还有通话进行中'
						: 'There are calls in progress',
					this.$store.getters.language == 'zh' ? '提示' : 'Prompt',
					{
						type: 'error'
					}
				);
				return;
			}
			if (phone) {
				this.$refs.phoneCall.phone = phone;
				this.$refs.phoneCall.callDisplay = true;
			}
		},
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._getDevicesList();
		},
		handleSelectionChange(val) {
			this.selectDidList = val.map((item) => {
				return item.fDid;
			});
		},
		searchDevices: _debounce(function() {
			this.currentPage = 1;
			this._getDevicesList();
		}),
		_getDevicesList() {
			this.loading = this.$loading({
				target: document.querySelector('.add-message-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getDevicesList({ page: this.currentPage, search: this.search })
				.then((data) => {
					this.loading.close();

					let { total, pageNum, pageSize, list } = data;
					this.pageSize = pageSize;
					this.total = total;
					this.tableData = list.map((item) => {
						let date = '';
						if (item.fSaveTime) {
							if (!isNaN(item.fSaveTime)) {
								date = formatDateToStr(
									item.fSaveTime * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDateToStr(
									item.fSaveTime,
									this.$store.getters.language
								);
							}
							item.fSaveTime = date;
						} else {
							item.fSaveTime = '';
						}

						return item;
					});
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}
				})
				.catch((error) => {
					this.loading.close();
					this.$message({
						showClose: true,
						message:
							error.message || `Request failed with status code${error.status}`,
						type: 'error'
					});
				});
		},

		// 重置表单样式
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 10) {
				return 'text-align: center;cursor: pointer;';
			}
			if (columnIndex === 3) {
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			}
			return 'color: #666666;text-align: center;position: relative;';
		}
	}
};
</script>

<style lang="scss">
@import '@/style/mixin.scss';

.add-message-header {
	@include flex-b-c;
	flex-wrap: wrap;
	.el-input {
		width: 200px !important;
	}
	.el-form-item__label {
		color: #000000;
		font-size: 18px;
	}
}
.add-message-dialog {
	.add-message-table {
		margin-bottom: 20px;
	}
	.el-dialog__body {
		padding: 0;
		padding-top: 10px;
	}
	.footer-bg {
		margin-bottom: 20px;
		.el-form--inline {
			@include flex-s-c;
		}
		.el-form-item__label {
			color: #000000;
			font-size: 14px;
		}
		.el-form-item {
			margin-bottom: 15px;
			margin-right: 20px;
		}
		.el-input {
			width: 160px !important;
		}
		.message-type-radio {
			@include flex-c-c-c;
			.el-radio {
				width: 100px;
				margin-left: 0 !important;
				margin-right: 0 !important;
				background-color: #fff;
			}
		}

		.el-dropdown-link {
			width: 70px;
			& > span {
				flex-grow: 1;
			}
			@include flex-c-c;
		}
	}
}
.repeat-checkbox-bg {
	position: relative;
	display: inline-block;
	.repeat-checkbox {
		width: 150px;
		background-color: #fff;
		position: absolute;
		right: -176px;
		bottom: -6px;
		z-index: 1000;
		padding: 20px;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
		border-radius: 4px;
	}
	.el-checkbox-group {
		height: 260px;
		@include flex-c-c-c;
		align-items: flex-start;
		justify-content: space-between;
		.el-checkbox__label {
			font-size: 16px;
			color: #000;
		}
	}
}
</style>
