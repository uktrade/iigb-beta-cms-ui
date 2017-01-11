<template>
  <transition name="alerts">
    <div class="alerts-mask">
      <div class="alerts-wrapper">
        <div :class="alertsSize">

          <div v-if="type === 'error'"
               class="alerts-header alerts-icon alerts-error">
            <span class="x-mark animate-x-mark">
              <span class="line left"></span>
              <span class="line right"></span>
            </span>
          </div>

          <div v-if="type === 'success'"
               class="alerts-header alerts-icon alerts-success">
            <div class="placeholder"></div>
            <span class="line tip"></span>
            <span class="line long"></span>
            <div class="fix"></div>
          </div>

          <div v-if="type === 'question'"
               class="alerts-header alerts-icon alerts-question">?</div>

          <div v-if="type === 'warning'"
               class="alerts-header alerts-icon alerts-warning">!</div>

          <div v-if="type === 'info'"
               class="alerts-header alerts-icon alerts-info">i</div>

          <div class="alerts-body">
            <slot name="body"></slot>
          </div>

          <div class="alerts-footer">
            <slot name="footer">
              <!--default footer-->
                <button class="btn btn-danger" @click="$emit('close')">
                  Close
                </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'alerts',
    props: {
      type: {default: "info"},
      alertsSize: {default: "alerts-container-lg"}
    },
    data: function () {
      return {
        input: null
      }
    },
    methods: {
      console(some) {
        console.log(some)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .alerts-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    display: table;
    transition: opacity .3s ease;
  }

  .alerts-wrapper {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .alerts-container-lg {
    width: 500px;
    min-height: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
  }

  .alerts-container-sm {
    width: 30%;
    height: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
  }

  .alerts-header {
    /*margin: 20px auto 30px;*/
    /*height: 70px;*/
  }

  .alerts-body {
    margin: 20px 0;
  }

  .button-wrapper {
    text-align: center;
  }

  .alerts-icon {
    width: 80px;
    height: 80px;
    border: 4px solid transparent;
    border-radius: 50%;
    margin: 20px auto 30px;
    padding: 0;
    position: relative;
    box-sizing: content-box;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &.alerts-error {
      border-color: #f27474;

    .x-mark {
      position: relative;
      display: block;
    }

    .line {
      position: absolute;
      height: 5px;
      width: 47px;
      background-color: #f27474;
      display: block;
      top: 37px;
      border-radius: 2px;

        &.left {
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          left: 17px;
        }

        &.right {
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          right: 16px;
        }
      }
    }

    &.alerts-warning {
      font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
      color: #f8bb86;
      border-color: #facea8;
      font-size: 55px;
      line-height: 80px;
      text-align: center;
    }

    &.alerts-info {
      font-family: 'Open Sans',sans-serif;
      color: #3fc3ee;
      border-color: #9de0f6;
      font-size: 55px;
      line-height: 80px;
      text-align: center;
    }

    &.alerts-question {
      font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
      color: #87adbd;
      border-color: #c9dae1;
      font-size: 60px;
      line-height: 80px;
      text-align: center;
    }

    &.alerts-success {
      border-color: #a5dc86;

    /*::after,::before {*/
      /*content: '';*/
      /*position: absolute;*/
      /*width: 60px;*/
      /*height: 120px;*/
      /*background: #fff;*/
    /*}*/

    /*::before {*/
      /*border-radius: 120px 0 0 120px;*/
      /*top: -7px;*/
      /*left: -33px;*/
      /*-webkit-transform: rotate(-45deg);*/
      /*transform: rotate(-45deg);*/
      /*-webkit-transform-origin: 60px 60px;*/
      /*transform-origin: 60px 60px;*/
    /*}*/

    /*::after {*/
      /*border-radius: 0 120px 120px 0;*/
      /*top: -11px;*/
      /*left: 30px;*/
      /*-webkit-transform: rotate(-45deg);*/
      /*transform: rotate(-45deg);*/
      /*-webkit-transform-origin: 0 60px;*/
      /*transform-origin: 0 60px;*/
    /*}*/

    /*.placeholder {*/
      /*width: 80px;*/
      /*height: 80px;*/
      /*border: 4px solid rgba(165,220,134,.2);*/
      /*border-radius: 50%;*/
      /*box-sizing: content-box;*/
      /*position: absolute;*/
      /*left: -4px;*/
      /*top: -4px;*/
      /*z-index: 2;*/
    /*}*/

    .placeholder {
      width: 80px;
      height: 80px;
      border: 4px solid rgb(165,220,134);
      border-radius: 50%;
      box-sizing: content-box;
      position: absolute;
      left: -4px;
      top: -4px;
      z-index: 2;
      background-color: white;
    }

    /*.fix {*/
      /*width: 7px;*/
      /*height: 90px;*/
      /*background-color: #fff;*/
      /*position: absolute;*/
      /*left: 28px;*/
      /*top: 8px;*/
      /*z-index: 1;*/
      /*-webkit-transform: rotate(-45deg);*/
      /*transform: rotate(-45deg);*/
    /*}*/

    .line {
      height: 5px;
      background-color: #a5dc86;
      display: block;
      border-radius: 2px;
      position: absolute;
      z-index: 2;

        &.tip {
          width: 25px;
          left: 14px;
          top: 46px;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        }

        &.long {
          width: 47px;
          right: 8px;
          top: 38px;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
      }
    }
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="alerts" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the alerts transition by editing
   * these styles.
   */

  .alerts-enter {
    opacity: 0;
  }

  .alerts-leave-active {
    opacity: 0;
  }

  .alerts-enter .alerts-container,
  .alerts-leave-active .alerts-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
