/*
 * Copyright (c) 2020. Space LLC
 */

var Matrix = {
	blocked: (id) => {
		let text = $GL(
			'matrix_sniper_blocked_text:В этот стол нельзя ставить клонов, до тех пор пока не будет до конца заполнен текущий стол. Открыть текущий стол?');
		if (id === undefined) {
			text = $GL('matrix_sniper_blocked_text_bonus:В этот стол нельзя ставить бонусные клоны');
		}
		new SweetAlert({
			title: $GL('matrix_sniper_blocked:Стол заблокирован.'),
			text: text
			, showCancelButton: id !== undefined
			//, confirmButtonColor: "#143ab1"
			//	, cancelButtonColor: "#3c890c"
			, confirmButtonText: id !== undefined ? $GL("Yes:Да") : 'OK'
			, cancelButtonText: $GL("No:Нет"),
			showLoaderOnConfirm: true,
			preConfirm: () => {
				if (id !== undefined) {
					return (new Promise((resolve, reject) => {

						AjaxRequest('GET', '/app/matrix/show/' + id + '?is_overlay=1', {}, function (data) {
						//	debugger;
							if (data.html) {
								resolve(data);
							} else {
								reject(data)
							}
						}, function (data) {
							reject(false)
						})

					})).then(response => {
						let $o = $('.overlay-layer:visible');
						if ($o.length > 0) {
							$o.html(response.html);
						} else {
							MY_OVERLAY.active(response.html);
						}
						return response;
					}).catch(error => {
						if (error === false) {
							return;
						}
						let errorMessage = typeof error.responseText !== 'undefined' ? error.responseText : response.error_message;
						//debugger;
						SweetAlert.showValidationMessage(
							`Request failed: ${error.responseText}`
						)
					});
				}
			},
			allowOutsideClick: () => !SweetAlert.isLoading()
		}).then((res) => {
			debugger;
			if (res === true || res.isConfirmed) {
				//	MY_OVERLAY.active(res.value);
			}
		});
	},
	map: (id) => {
		$('.kmfdm-partnership__body').on('mouseDown', function () {
			$('.matrix-map-wrap').addClass('moving');
		}).on('mouseUp', function () {
			$('.matrix-map-wrap').removeClass('moving');
		})

		function requestInitialRootData() {
			var deferred = $.Deferred();
			AjaxRequest('GET', '/api/matrix/map/' + id, {}, (response) => {
				deferred.resolve(response.data.data);
			});
			return deferred.promise();
		}

		function requestDirectChildrenData(nodeId) {
			var deferred = $.Deferred();

			AjaxRequest('GET', '/api/matrix/map/' + nodeId, {'onlyChildren': true}, (response) => {
				deferred.resolve(response.data.data)
			});

			return deferred.promise();
		}

		var initialRootDataRequestPromise = requestInitialRootData();
		initialRootDataRequestPromise.then((data) => {
			var treePlugin = new d3.mitchTree.boxedTree()
				.setData(data)
				.setElement(document.getElementById("matrix-map"))
				.setIdAccessor(function (data) {
					return data.id;
				})
				.setChildrenAccessor(function (data) {
					return data.children;
				})
				.setBodyDisplayTextAccessor(function (data) {
					return data.description;
				})
				.setTitleDisplayTextAccessor(function (data) {
					return data.name;
				})
				.setMargins({
					top: 10,
					right: 10,
					bottom: 10,
					left: 10
				})
				.getNodeSettings()
				.setSizingMode('nodesize')
				.setVerticalSpacing(20)
				.setHorizontalSpacing(100)
				.back()
				.getLoadOnDemandSettings()
				.setLoadChildrenMethod(function (data, processData) {
					var nodeIdToLoadChildrenFor = this.getId(data);
					requestDirectChildrenData(nodeIdToLoadChildrenFor).then(function (result) {
						processData(result);
					}, function () {
						throw arguments;
					});
				})
				.setHasChildrenMethod(function (data) {
					return data.hasChildren;
				})
				.back()
				.on("drap", function (event) {
					console.log('The event object:')
					console.log(event);
				})
				.on("nodeClick", function (event) {
					console.log('The event object:')
					console.log(event);
					console.log("Click event was triggered!");

					// Note for 'collapse' or 'expand' event type
					// to trigger, you'll need to disable focus mode.
					// You can do this by passing in false for the
					// allowFocus setting.
					if (event.type == 'focus') {
						console.log("Node is being focused");
					} else if (event.type == 'collapse') {
						console.log("Node is collapsing");
					} else if (event.type == 'expand') {
						console.log("Node is expanding");
					}
					// You use the below line to cancel the
					// focus/expand/collapse event
					//   event.preventDefault();
				});
			if ($('.isMobile').length > 0) {
				treePlugin.setOrientation('topToBottom');
			}
			treePlugin.initialize();

			function updateTreeClasses(treePlugin) {
				const nodes = treePlugin.getPanningContainer().selectAll("g.node");

				/*debugger;
				for(var i in nodes._groups) {
					let node = nodes._groups[i][0];
					node.append("canvas");
					var canvas = node.selectAll('canvas');
					var context = canvas.getContext('2d');
					var image = new Image();
					image.onload = function () {
						context.drawImage(image, 0, 0, canvas.width, canvas.height);
					};
					image.src = "http://www.lunapic.com/editor/premade/transparent.gif";
				}*/
				nodes.attr("class", function (data, index, arr) {

					var depthClass = "depth-" + data.depth;

					if (data.data.photo) {
						let $group = $(this).find('g.body-group');
						if (!$group.hasClass('append')) {
							let g = document.createElementNS("http://www.w3.org/2000/svg", "g");

							let foreign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
							foreign.setAttributeNS(null, 'width', '30');
							foreign.setAttributeNS(null, 'height', '30');
							foreign.setAttributeNS(null, 'x', '5');
							foreign.setAttributeNS(null, 'y', '-32');

							let img = document.createElement('img');
							img.setAttribute('src', data.data.photo);
							img.setAttribute('style', 'border-radius: 50%');
							img.setAttribute('width', '30');
							img.setAttribute('height', '30');
							foreign.append(img);

							g.append(foreign);
							$group.append(g);

							let gc = document.createElementNS("http://www.w3.org/2000/svg", "g");
							let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
							gc.append(text);
							gc.setAttributeNS(null, 'transform', 'translate(96, 31)');
							text.setAttribute('style', 'fill: #4271ff; font-size: 13px;')
							text.append(data.data.cntChildren)
							$group.append(gc);
							$group.addClass('append');
							if (data.data.cntChildren > 0) {
								depthClass += ' has-children';
							}
						}
					}

					var existingClasses = this.getAttribute('class');
					if (!existingClasses) {
						return depthClass;
					}
					var hasDepthClassAlready = (' ' + existingClasses + ' ').indexOf(' ' + depthClass + ' ') > -1;
					if (hasDepthClassAlready) {
						return existingClasses;
					}
					return existingClasses + " " + depthClass;
				});
			}

			// Override the core update method,
			// so it'd call our custom update method
			treePlugin.update = function (nodeDataItem) {
				// Call the original update method
				this.__proto__.update.call(this, nodeDataItem);
				updateTreeClasses(this);
			}

			updateTreeClasses(treePlugin);

			treePlugin.focusToNode(id);
		});
	},
	activation: false,
	inQueue: (id) => {
		new SweetAlert({
			title: $GL('matrix_in_queue:Ожидается проставление клона в эту ячейку #[#id]', {id: id})
		});
	},
	partnersRequest: function (parent_id, lvl, pos, type) {
		AjaxRequest('GET', '/api/matrix/get-raw-partners/' + type, {}, function (response) {
			if (response.data.length == 0) {
				swal({title: $GL('matrix_no_for_sniper:Нет доступных партнеров для простановки')});
				return;
			}
			let res = '';
			let i = 0;
			for (var id in response.data) {
				i++;
				let user = response.data[id];
				res +=
					'<label><input type="radio" name="rawParent" value="' + id + '" ' + (i == 1 ? 'checked' : '') + ' class="rawParent">'
					+ '<span class="martix_choose_partner"><img src="' + user.photo + '" width="30"'
					+ ' height="30"'
					+ ' style="border-radius:'
					+ ' 50%" alt="">#' + id + ' ' + user.fio + '</span></label>';
			}
			MY_OVERLAY.active('<div style="text-align: center"><h2>' + $GL('matrix_chooose_partner:Выберите партнера') + '</h2><div'
				+ ' class="rawrartners__list"><div>' + res +
				'</div><button class="kmfdm-button kmfdm-button_fill_action" onclick="Matrix.sniper(\'' + parent_id + '\', \'' + lvl + '\', \'' + pos + '\','
				+ ' \'' + type + '\', undefined, $(\'.rawParent:checked\').val())">' + $GL('matrix_to_sniper:Выставить') + '</button></div></div>');
		})
	},
	sniperMode: (parent_id, lvl, pos, type, buy) => {
		let _this = this;
		let params = {
			title: $GL('matrix_choose_sniper_mode:Выберите кого будем активировать?')
			, showCancelButton: true
			, confirmButtonColor: "#143ab1"
			, cancelButtonColor: "#3c890c"
			, confirmButtonText: $GL("matrix_clone:Купить клон")
			, cancelButtonText: $GL("matrix_partner:Партнер")
		};
		new SweetAlert(params).then(function (res) {
			if (res === true || res.isConfirmed) {
				setTimeout(function () {
					Matrix.sniper(parent_id, lvl, pos, type, buy)
				}, 200);
			} else if (res.isDismissed && res.dismiss == 'cancel') {
				(async () => {

					Matrix.partnersRequest(parent_id, lvl, pos, type);

				})()
			}
		});
	},
	sniper: function (parent_id, lvl, pos, type, buy, child_id) {
		let fn = function () {
			let $btn = $('.overlay button');
			if ($btn && $btn.length > 0) {
				if ($btn.hasClass('.kmfdm-button__load')) {
					return;
				}
				$btn.addClass('kmfdm-button__load');
			}
			AjaxRequest('POST', '/api/matrix/sniper',
				{matrix_id: parent_id, lvl: lvl, pos: pos, type: type, buy: buy !== undefined ? 1 : 0, child_id: child_id}, function (data) {
					$btn.removeClass('kmfdm-button__load');
					if (data.data.success == 1) {
						if ($('.overlay-open').length) {
							MY_OVERLAY.close();
						}
						let url = $('.overlay .matrix_user div[href]').attr('href');
						if (typeof url !== 'undefined') {
							AsOverlayRequest('/app/matrix/show/' + parent_id);
						} else {
							AjaxPage('/app/matrix/show/' + parent_id);
						}
						iziToast.show({
							message: $GL('matrix_success_open:Стол успешно отправлен на активацию'),
							color: 'green',
							position: 'topRight',
							title: $GL('success:Успешно')
						});
					}

				}, () => {
					$btn.removeClass('kmfdm-button__load');
				});
		};
		if (parent_id == '') {
			fn();
		} else {
			if (child_id == undefined) {
				var text = $GL('matrix_sniper_confirm:Вы действительно хотите активировать клона в этом месте?');
			} else {
				var text = $GL('matrix_sniper_confirm_partner:Вы действительно хотите поставить партнера в это место?');
			}
			if (buy !== undefined && child_id == undefined) {
				text += '<br>' + $GL('matrix_sniper_confirm_buy:С баланса спишется [#amount]', {amount: buy});
			}
			text += "<br>" + $GL('matrix_sniper_confirm_end:Отменить операцию будет нельзя. Будьте внимательны.');

			new SweetAlert({
				title: $GL('alert:Внимание!')
				, text: text
				, html: text
				, type: 'warning'
				, showCancelButton: true
				, confirmButtonColor: "#dd6b55"
				, confirmButtonText: buy !== undefined ? $GL("yes_pay:Да оплатить!") : $GL("yes:Да")
				, cancelButtonText: $GL("No:Нет")
			}).then(function (res) {
				if (res.isConfirmed) {
					setTimeout(fn, 100);
				}
			});
		}
	},
	activate: function (index, payment, btn) {

		if (payment) {
			GoAjax({
				module: 'matrix',
				act: 'payment',
				index: index
			}, function (data) {
				MY_OVERLAY.active(data.html);
			}, true, function (e) {
				if (e.error_message !== undefined) {
					show_message('red', e.error_message);
				} else {
					$('body').append(e.responseText);
				}
			});
		} else {
			var self = this;
			if (self.activation) {
				return;
			}
			$(btn).addClass('kmfdm-button__load');
			self.activation = true;
			GoAjax({
				module: 'matrix',
				act: 'activate',
				index: index
			}, function (data) {
				self.activation = false;
				$(btn).removeClass('kmfdm-button__load');
				if (data.matrix) {
					AjaxPage('/app/matrix/cat/' + data.matrix.category + '/' + data.matrix.typeId);
				}
			}, true, function () {
				self.activation = false;
				$('.kmfdm-button__load').removeClass('kmfdm-button__load');
			});
		}
	}
}