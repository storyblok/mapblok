<script>
import InfoWindow from './InfoWindow.html'
import Util from '../libs/Util'

export default {
  template: Util.template('#mapblok-info-window', InfoWindow),
  props: ['location']
}
</script>

<style lang="scss">
.mapblok {
  .infobox {
    background: #fff;
    height: auto;
    width: 210px;
    text-align: center;
    font-size: 17px;
    padding: 20px;
    font-size: 14px;
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow:    0px 0px 15px 0px rgba(0, 0, 0, 0.3);
    box-shadow:         0px 0px 15px 0px rgba(0, 0, 0, 0.3);
    line-height: 1.4;
    position: relative;
  }

  .infobox__contact {
    margin-top: 10px;
  }

  .infobox__picture {
    max-width: 100%;
  }

  .infobox__company {
    font-weight: 300;
  }

  .infobox__weblink {
    word-break: break-all;
  }

  .infobox__close {
    position: absolute;
    color: #000;
    right: 0;
    top: 0;
    text-decoration: none;
    padding: 10px;
    display: inline-block;
    font-size: 20px;

    &:hover, :active {
      color: #000;
    }
  }
}
</style>
