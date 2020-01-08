<template>
	<div v-if="callDisplay" class="phone-call-bg">
		<i class="el-icon-close" @click="hangUp"></i>
		<div id="call-controls">
			<div class="call-controls-info">
				<i class="el-icon-phone"> {{ secondToDate(callTime) }}</i>
				<el-input v-model="phone" placeholder="Enter a phone"></el-input>
			</div>
			<div
				style="display: flex;align-items: flex-end;justify-content: space-between;flex-grow: 1;"
			>
				<div id="volume-indicators">
					<label>Mic Volume</label>
					<div><div :style="inputVolumeBarStyle"></div></div>
					<label>Speaker Volume</label>
					<div><div :style="outputVolumeBarStyle"></div></div>
				</div>
				<el-button
					v-if="isConnetReady && isHangUp"
					class="btn-call"
					size="medium"
					icon="el-icon-phone"
					circle
					@click="callPhone"
				></el-button>
				<el-button
					v-if="isConnetReady && !isHangUp"
					size="medium"
					type="danger"
					icon="el-icon-phone"
					circle
					@click="hangUp"
				></el-button>
			</div>
		</div>
		<div id="log" v-html="logInnerHTML"></div>
	</div>
</template>

<script>
import { getTwiltoken } from '@/api/call';
let device;
export default {
	name: 'Call',
	props: {},
	data() {
		return {
			TimeRanges: null,
			startTime: new Date(),
			callTime: 0,
			callDisplay: false,
			phone: '',
			isConnetReady: false,
			isHangUp: true,
			logInnerHTML: '',
			inputVolumeBarStyle: { 'margin-bottom': '5px' },
			outputVolumeBarStyle: {}
		};
	},
	watch: {
		callDisplay() {
			if (this.callDisplay) {
				setTimeout(() => {
					this._getTwiltoken();
				}, 100);
			} else {
				device = null;
				this.startTime = new Date();
				this.callTime = '00:00:00';
				this.isConnetReady = false;
				this.isHangUp = true;
				this.logInnerHTML = '';
				this.inputVolumeBarStyle = { 'margin-bottom': '5px' };
				this.outputVolumeBarStyle = {};
				clearInterval(this.TimeRanges);
			}
		}
	},
	destroyed() {
		clearInterval(this.TimeRanges);
	},
	methods: {
		callPhone() {
			// get the phone number to connect the call to
			var params = {
				To: this.phone
			};
			var myreg = /^[-+0-9\s]+$/;
			if (!myreg.test(params.To)) {
				alert('Malformed phone number');
				return;
			}
			console.log('Calling ' + params.To + '...');
			if (device) {
				var outgoingConnection = device.connect(params);
				outgoingConnection.on('ringing', () => {
					this.log(`<p>>> Ringing...</p>`);
				});
			}
		},
		hangUp() {
			this.log(`<p>>> Hanging up...</p>`);
			if (device) {
				device.disconnectAll();
			}
			this.callDisplay = false;
			clearInterval(this.TimeRanges);
		},
		_getTwiltoken() {
			this.loading = this.$loading({
				target: document.querySelector('.phone-call-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});
			this.log(`<p>>> Requesting Capability Token...</p>`);
			getTwiltoken()
				.then((data) => {
					this.log(`<p>>> Got a token...</p>`);
					// Setup Twilio.Device
					device = new Twilio.Device(data.token, {
						// Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
						// providing better audio quality in restrained network conditions. Opus will be default in 2.0.
						codecPreferences: ['opus', 'pcmu'],
						// Use fake DTMF tones client-side. Real tones are still sent to the other end of the call,
						// but the client-side DTMF tones are fake. This prevents the local mic capturing the DTMF tone
						// a second time and sending the tone twice. This will be default in 2.0.
						fakeLocalDTMF: true,
						// Use `enableRingingState` to enable the device to emit the `ringing`
						// state. The TwiML backend also needs to have the attribute
						// `answerOnBridge` also set to true in the `Dial` verb. This option
						// changes the behavior of the SDK to consider a call `ringing` starting
						// from the connection to the TwiML backend to when the recipient of
						// the `Dial` verb answers.
						enableRingingState: true
					});

					device.on('ready', (device) => {
						this.log(`<p style="color:#39c973;">>> Twilio.Device Ready.</p>`);
						this.isConnetReady = true;
					});

					device.on('error', (error) => {
						console.log(error.message);
						this.log(`<p>>> Error: Connection failed ! </p>`);
						clearInterval(this.TimeRanges);
					});

					device.on('connect', (conn) => {
						this.log(`<p>>> Successfully established call.</p>`);
						this.isConnetReady = true;
						this.isHangUp = false;
						this.bindVolumeIndicators(conn);
						this.callTime = 0;
						this.getCallTime();
					});

					device.on('disconnect', (conn) => {
						this.log(`<p>>> Call ended.</p>`);
						this.isConnetReady = true;
						this.isHangUp = true;
						clearInterval(this.TimeRanges);
					});
					this.loading.close();
					// device.on('incoming', (conn) => {
					// 	this.log(
					// 		`<p>>> Incoming connection from ${conn.parameters.From}</p>`
					// 	);
					// 	var archEnemyPhoneNumber = '+12093373517';
					// 	if (conn.parameters.From === archEnemyPhoneNumber) {
					// 		conn.reject();
					// 		this.log(`<p>>> It's your nemesis. Rejected call.</p>`);
					// 	} else {
					// 		// accept the incoming connection and start two-way audio
					// 		conn.accept();
					// 	}
					// });
				})
				.catch((err) => {
					console.log(err);
					this.loading.close();
					clearInterval(this.TimeRanges);
					this.log(
						`<p style="color:#ff4848;">>> Could not get a token from server !</p>`
					);
				});
		},
		// 计时器
		getCallTime() {
			clearInterval(this.TimeRanges);
			this.TimeRanges = setInterval(() => {
				this.callTime += 1;
			}, 1000);
		},
		// 转时分秒
		secondToDate(result) {
			var h =
				Math.floor(result / 3600) < 10
					? '0' + Math.floor(result / 3600)
					: Math.floor(result / 3600);
			var m =
				Math.floor((result / 60) % 60) < 10
					? '0' + Math.floor((result / 60) % 60)
					: Math.floor((result / 60) % 60);
			var s =
				Math.floor(result % 60) < 10
					? '0' + Math.floor(result % 60)
					: Math.floor(result % 60);
			return h + ':' + m + ':' + s;
		},
		// Activity log
		log(message) {
			let logDiv = document.getElementById('log');
			this.logInnerHTML = message;
		},
		bindVolumeIndicators(connection) {
			connection.on('volume', (inputVolume, outputVolume) => {
				var inputColor = '#ff4848';
				if (inputVolume < 0.5) {
					inputColor = '#39c973';
				} else if (inputVolume < 0.75) {
					inputColor = 'yellow';
				}

				this.inputVolumeBarStyle = {
					'margin-bottom': '5px',
					width: Math.floor(inputVolume * 400) + 'px',
					background: inputColor
				};

				var outputColor = '#ff4848';
				if (outputVolume < 0.5) {
					outputColor = '#39c973';
				} else if (outputVolume < 0.75) {
					outputColor = 'yellow';
				}

				this.outputVolumeBarStyle = {
					width: Math.floor(outputVolume * 400) + 'px',
					background: outputColor
				};
			});
		}
	}
};
</script>

<style lang="scss">
@import '@/style/mixin.scss';
.phone-call-bg {
	background: #222;
	width: 600px;
	position: fixed;
	left: 50%;
	margin-left: -300px;
	top: 40%;
	padding: 20px 30px;
	box-sizing: border-box;
	border-radius: 6px;

	.el-icon-close {
		font-size: 20px;
		color: #ffffff;
		position: absolute;
		right: 5px;
		top: 5px;
		padding: 0 5px;
		cursor: pointer;
	}
	#call-controls {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.call-controls-info {
		max-width: 200px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: column;
		text-align: left;
		.el-icon-phone {
			font-size: 18px;
			color: $greenColor;
		}
		.el-input__inner {
			background-color: rgba(0, 0, 0, 0) !important;
			border: none !important;
			font-size: 18px;
			padding: 0;
			color: #fff;
			margin-top: 5px;
			height: 30px;
			line-height: 30px;
		}
	}

	.el-button {
		flex-grow: 0;
		flex-shrink: 0;
		width: 50px;
		height: 50px;
		background: $alertColor;
		border-color: $alertColor;

		.el-icon-phone {
			font-size: 24px;
		}
		&:hover {
			opacity: 0.9;
		}
	}
	#volume-indicators {
		width: 160px;
		text-align: left;
		margin-left: 30px;
		color: #aaa;
		& > div {
			height: 8px;
			margin-top: 4px;
			background: #333;
			overflow: hidden;
			div {
				height: 8px;
			}
		}
	}
	.btn-call {
		background: $greenColor !important;
		border-color: $greenColor !important;
		color: #ffffff !important;
	}
	#log {
		width: 250px;
		text-align: left;
		color: #aaa;
		font-size: 12px;
	}
}
</style>
