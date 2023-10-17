import React from 'react'
import PropTypes from 'prop-types'

const css = `
.amp-dc-banner {
    position: relative;
    overflow: hidden
}

.amp-dc-banner .amp-dc-hide {
    display: none
}

.amp-dc-banner .amp-dc-banner-pic {
    max-width: 100%;
    display: block
}

.amp-dc-banner .amp-dc-banner-pic img {
    width: 100%
}

.amp-dc-banner .amp-dc-banner-img {
    width: 100%;
    display: block
}

.amp-dc-banner .amp-dc-banner-info-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2
}

.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-left:before,.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad:before {
    content: "";
    background: -webkit-gradient(linear,right top,left top,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
    background: linear-gradient(to left,rgba(0,0,0,0),rgba(0,0,0,.6));
    position: absolute;
    z-index: 0;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-left:before,.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad:before {
        width:80%
    }
}

@media print,screen and (min-width: 64em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-left:before,.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad:before {
        width:70%
    }
}

@media screen and (min-width: 75em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-left:before,.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad:before {
        width:60%
    }
}

.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-right:before {
    content: "";
    background: -webkit-gradient(linear,left top,right top,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
    background: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.6));
    position: absolute;
    z-index: 0;
    width: 100%;
    top: 0;
    right: 0;
    height: 100%
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-right:before {
        width:80%
    }
}

@media print,screen and (min-width: 64em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-right:before {
        width:70%
    }
}

@media screen and (min-width: 75em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-right:before {
        width:60%
    }
}

.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-top:before {
    content: "";
    background: -webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
    background: linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,.6));
    position: absolute;
    z-index: 0;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-top:before {
        height:60%
    }
}

@media print,screen and (min-width: 64em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-top:before {
        height:80%
    }
}

@media screen and (min-width: 75em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-top:before {
        height:60%
    }
}

.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-bottom:before {
    content: "";
    background: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
    background: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.6));
    position: absolute;
    z-index: 0;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 100%
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-bottom:before {
        height:60%
    }
}

@media print,screen and (min-width: 64em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-bottom:before {
        height:80%
    }
}

@media screen and (min-width: 75em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-bottom:before {
        height:60%
    }
}

.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-middle:before {
    content: "";
    background: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
    background: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.6));
    position: absolute;
    z-index: 0;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 100%
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-middle:before {
        height:100%
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-full-sm:before,.amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-full:before {
        content:"";
        background: -webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
        background: linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,.6));
        position: absolute;
        z-index: 0;
        width: 100%;
        top: 0;
        left: 0;
        height: 100%
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-left-sm:before {
        content:"";
        background: -webkit-gradient(linear,right top,left top,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
        background: linear-gradient(to left,rgba(0,0,0,0),rgba(0,0,0,.6));
        position: absolute;
        z-index: 0;
        width: 100%;
        top: 0;
        left: 0;
        height: 100%
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-right-sm:before {
        content:"";
        background: -webkit-gradient(linear,left top,right top,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
        background: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.6));
        position: absolute;
        z-index: 0;
        width: 100%;
        top: 0;
        right: 0;
        height: 100%
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-bottom-sm:before {
        content:"";
        background: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
        background: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.6));
        position: absolute;
        z-index: 0;
        width: 100%;
        top: 0;
        left: 0;
        height: 100%
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info-wrap.o-dc-banner-info-grad-text-top-sm:before {
        content:"";
        background: -webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,0)),to(rgba(0,0,0,.6)));
        background: linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,.6));
        position: absolute;
        z-index: 0;
        width: 100%;
        top: 0;
        left: 0;
        height: 100%
    }
}

.amp-dc-banner .amp-dc-banner-info {
    position: absolute;
    max-width: calc(60% - 1rem);
    left: 1rem;
    white-space: normal;
    padding: 5px 0
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info {
        left:3.75rem;
        max-width: calc(50% - 3.75rem)
    }
}

@media print,screen and (min-width: 64em) {
    .amp-dc-banner .amp-dc-banner-info {
        padding:10px 0
    }
}

@media screen and (min-width: 90em) {
    .amp-dc-banner .amp-dc-banner-info {
        left:5.625rem;
        max-width: calc(50% - 5.625rem)
    }
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-left {
    top: auto;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%)
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-left {
    top: 1rem
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-left {
        top:3.75rem
    }
}

@media screen and (min-width: 90em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-left {
        top:5.625rem
    }
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-left {
    top: auto;
    bottom: 1.875rem
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-left {
        bottom:3.75rem
    }
}

@media screen and (min-width: 90em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-left {
        bottom:5.625rem
    }
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-center {
    top: 1rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    text-align: center;
    max-width: none;
    width: 90%
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-center {
        width:auto;
        width: 80%;
        top: 3.75rem
    }
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-center .o-dc-text-copy {
    margin-left: auto;
    margin-right: auto;
    max-width: 600px
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-center {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    max-width: none;
    width: 90%
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-center {
        width:auto;
        width: 80%
    }
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-center .o-dc-text-copy {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-center {
    top: auto;
    bottom: 1.875rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    text-align: center;
    max-width: none;
    width: 90%
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-center {
        width:auto;
        width: 80%;
        bottom: 3.75rem
    }
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-center .o-dc-text-copy {
    margin-left: auto;
    margin-right: auto;
    max-width: 600px
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-right {
    left: auto;
    right: 1rem;
    top: 1rem
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-right {
        right:3.75rem;
        top: 3.75rem
    }
}

@media screen and (min-width: 90em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-right {
        right:5.625rem;
        top: 5.625rem
    }
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-right {
    top: auto;
    left: auto;
    right: 1rem;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%)
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-right {
        right:3.75rem;
        max-width: calc(50% - 3.75rem)
    }
}

@media screen and (min-width: 90em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-right {
        right:5.625rem;
        max-width: calc(50% - 5.625rem)
    }
}

.amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-right {
    top: auto;
    bottom: 1.875rem;
    left: auto;
    right: 1rem
}

@media print,screen and (min-width: 40em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-right {
        right:1.875rem;
        bottom: 3.75rem;
        max-width: calc(50% - 1.875rem)
    }
}

@media screen and (min-width: 90em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-right {
        right:5.625rem;
        bottom: 5.625rem;
        max-width: calc(50% - 5.625rem)
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-left-sm {
        top:1rem;
        left: 1rem;
        -webkit-transform: none;
        transform: none;
        text-align: left
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-left-sm {
        top:auto;
        left: 1rem;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        text-align: left
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-left-sm {
        top:auto;
        left: 1rem;
        bottom: 1.875rem;
        -webkit-transform: none;
        transform: none;
        text-align: left
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-center-sm {
        top:1rem;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        text-align: center;
        max-width: none;
        width: 90%
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-center-sm {
        top:auto;
        bottom: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
        text-align: center;
        max-width: none;
        width: 90%
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-center-sm {
        top:auto;
        bottom: 1.875rem;
        right: auto;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        text-align: center;
        max-width: none;
        width: 90%
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-top-right-sm {
        left:auto;
        right: 1rem;
        top: 1rem;
        -webkit-transform: none;
        transform: none;
        text-align: left
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-middle-right-sm {
        top:auto;
        left: auto;
        right: 1rem;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        text-align: left
    }
}

@media screen and (max-width: 39.99875em) {
    .amp-dc-banner .amp-dc-banner-info.o-dc-banner-text-bottom-right-sm {
        top:auto;
        bottom: 1.875rem;
        left: auto;
        right: 1rem;
        -webkit-transform: none;
        transform: none;
        text-align: left
    }
}

.amp-dc-banner .amp-dc-banner-info .o-dc-text-copy {
    max-width: 400px;
    margin: 0
}

.amp-dc-banner .amp-dc-banner-info .o-dc-button,.amp-dc-banner .amp-dc-banner-info .o-dc-cta-underline {
    margin: 1.25rem 0 0 0
}



.amp-dc-banner {
    position: relative;
    overflow: hidden;
    white-space: nowrap
}

.amp-dc-banner * {
    margin: 0;
    padding: 0
}

.amp-dc-banner .amp-dc-hide {
    display: none
}

.amp-dc-banner .amp-dc-banner-info {
    font-size: 22px;
    text-align: center;
    background: #fff;
    color: #000;
    padding: 15px;
    min-width: 200px
}

.amp-dc-banner .amp-dc-banner-pic {
    max-width: 100%;
    display: block
}

.amp-dc-banner .amp-dc-banner-pic img {
    width: 100%
}

.amp-dc-banner .amp-dc-banner-img {
    width: 100%;
    display: block
}

.amp-dc-banner .amp-dc-banner-info-wrap {
    color: #fff;
    height: 100%;
    position: absolute;
    top: 0;
    white-space: normal
}

.amp-dc-banner .amp-dc-banner-info-wrap[data-align=left] {
    left: 65px
}

.amp-dc-banner .amp-dc-banner-info-wrap[data-align=right] {
    right: 65px
}

.amp-dc-banner .amp-dc-banner-info {
    display: inline-block;
    vertical-align: middle
}

.amp-dc-banner .amp-dc-banner-header {
    font-size: 32px
}

.amp-dc-banner .amp-dc-banner-description,.amp-dc-banner .amp-dc-banner-subheader {
    font-size: 16px;
    margin-top: 15px
}

.amp-dc-banner .amp-dc-banner-button {
    font-size: 20px;
    margin-top: 15px;
    display: inline-block;
    min-width: 40%;
    padding: 17px 15px;
    background: #fff;
    text-decoration: none;
    font-weight: 700;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

.amp-dc-banner .amp-dc-banner-button.black {
    background: #000;
    color: #fff
}

.amp-dc-banner .amp-dc-banner-button.white {
    background: #fff;
    color: #000
}

@media screen and (max-width: 768px) {
    .amp-dc-banner .amp-dc-banner-info-wrap {
        width:40%
    }

    .amp-dc-banner .amp-dc-banner-info-wrap[data-align=left] {
        left: 35px
    }

    .amp-dc-banner .amp-dc-banner-info-wrap[data-align=right] {
        right: 35px
    }

    .amp-dc-banner .amp-dc-banner-info-wrap.amp-dc-info-bottom {
        position: relative;
        top: 0!important;
        left: 0!important;
        right: auto;
        display: block;
        width: 100%;
        text-align: center;
        padding: 0 15px 10px 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box
    }

    .amp-dc-banner .amp-dc-banner-info-wrap.amp-dc-info-bottom .amp-dc-banner-info {
        display: block
    }
}

@media screen and (max-width: 480px) {
    .amp-dc-banner .amp-dc-banner-info-wrap {
        width:50%
    }

    .amp-dc-banner .amp-dc-banner-info-wrap[data-align=left] {
        left: 20px
    }

    .amp-dc-banner .amp-dc-banner-info-wrap[data-align=right] {
        right: 20px
    }

    .amp-dc-banner .amp-dc-banner-info-wrap.amp-dc-info-bottom {
        width: 100%
    }

    .amp-dc-banner .amp-dc-banner-info-wrap.amp-dc-info-bottom[data-align=left] {
        left: 0
    }

    .amp-dc-banner .amp-dc-banner-info-wrap.amp-dc-info-bottom[data-align=right] {
        right: 0
    }
}
`

const imagecss = `
.hovereffect .overlay {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0
}

.hovereffect img {
    display: block;
    position: relative
}

.ehover1 img {
    -webkit-transition: all .4s linear;
    transition: all .4s linear
}

.ehover1 .overlay {
    opacity: 0;
    background-color: rgba(0,0,0,.5);
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out
}

.ehover1 .o-dc-text-copy,.ehover1 .o-dc-text-headline1,.ehover1 .o-dc-text-headline2 {
    -webkit-transform: translatey(-100px);
    transform: translatey(-100px);
    opacity: 0;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out
}

.ehover1 .o-dc-button {
    opacity: 0;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out
}

.ehover1:hover img {
    -webkit-transform: scale(1.2);
    transform: scale(1.2)
}

.ehover1:hover .overlay {
    opacity: 1
}

.ehover1:hover .o-dc-button,.ehover1:hover .o-dc-text-copy,.ehover1:hover .o-dc-text-headline1,.ehover1:hover .o-dc-text-headline2 {
    opacity: 1;
    -webkit-transform: translatey(0);
    transform: translatey(0)
}

.ehover1:hover .o-dc-button {
    -webkit-transition-delay: .2s;
    transition-delay: .2s
}

.ehover3 img {
    -webkit-transition: all .4s ease-in;
    transition: all .4s ease-in
}

.ehover3 .o-dc-button,.ehover3 .o-dc-text-copy,.ehover3 .o-dc-text-headline1,.ehover3 .o-dc-text-headline2 {
    -webkit-transform: scale(.7);
    transform: scale(.7);
    -webkit-transition: all .4s ease-in;
    transition: all .4s ease-in;
    opacity: 0
}

.ehover3:hover img {
    filter: grayscale(1) blur(3px);
    -webkit-filter: grayscale(1) blur(3px);
    -webkit-transform: scale(1.2);
    transform: scale(1.2)
}

.ehover3:hover .o-dc-button,.ehover3:hover .o-dc-text-copy,.ehover3:hover .o-dc-text-headline1,.ehover3:hover .o-dc-text-headline2 {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1)
}

.ehover12 {
    background: #42b078
}

.ehover12 img {
    max-width: none;
    width: calc(100% + 20px);
    -webkit-transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,transform .35s;
    transition: opacity .35s,transform .35s,-webkit-transform .35s;
    -webkit-transform: translate3d(-10px,0,0);
    transform: translate3d(-10px,0,0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
}

.ehover12:hover img {
    opacity: .4;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0)
}

.ehover12 .overlay {
    padding: 50px 20px
}

.ehover12 .o-dc-text-copy {
    position: relative;
    overflow: hidden;
    padding: 0 0 1.25rem
}

.ehover12 .o-dc-text-copy:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #fff;
    -webkit-transition: -webkit-transform .35s;
    transition: -webkit-transform .35s;
    transition: transform .35s;
    transition: transform .35s,-webkit-transform .35s;
    transition: transform .35s,-webkit-transform .35s;
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
}

.ehover12:hover .o-dc-text-copy:after {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0)
}

.ehover12 .o-dc-button {
    opacity: 0;
    -webkit-transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,transform .35s;
    transition: opacity .35s,transform .35s,-webkit-transform .35s;
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0)
}

.ehover12:hover .o-dc-button {
    opacity: 1;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0)
}

.ehover13 img {
    -webkit-transition: all .35s;
    transition: all .35s
}

.ehover13 .overlay,.ehover13 button {
    -webkit-transition: opacity .35s,-webkit-transform .35s
}

.ehover13:hover img {
    filter: brightness(.6);
    -webkit-filter: brightness(.6)
}

.ehover13 .overlay {
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
    border-bottom: 1px solid #fff;
    border-top: 1px solid #fff;
    -webkit-transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,transform .35s;
    transition: opacity .35s,transform .35s,-webkit-transform .35s;
    -webkit-transform: scale(0,1);
    transform: scale(0,1)
}

.ehover13:hover .overlay {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1)
}

.ehover13 .o-dc-button,.ehover13 .o-dc-text-headline1,.ehover13 .o-dc-text-headline2 {
    opacity: 0
}

.ehover13 .o-dc-button {
    -webkit-transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,transform .35s;
    transition: opacity .35s,transform .35s,-webkit-transform .35s;
    -webkit-transform: translate3d(0,100%,0);
    transform: translate3d(0,100%,0)
}

.ehover13 .o-dc-text-headline1,.ehover13 .o-dc-text-headline2 {
    background-color: transparent;
    -webkit-transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,-webkit-transform .35s;
    transition: opacity .35s,transform .35s;
    transition: opacity .35s,transform .35s,-webkit-transform .35s;
    -webkit-transform: translate3d(0,-100%,0);
    transform: translate3d(0,-100%,0)
}

.ehover13:hover .o-dc-button,.ehover13:hover .o-dc-text-headline1,.ehover13:hover .o-dc-text-headline2 {
    opacity: 1;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0)
}

.amp-dc-image {
    margin: 0;
    padding: 0;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    display: block
}

.amp-dc-image .amp-dc-image-pic {
    display: block
}

.amp-dc-image .overlay {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0
}

.amp-dc-image img {
    width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.amp-dc-image-pic-wrap-hotspots {
    position: relative
}

.amp-dc-image-pic-wrap [data-type=poi-hotspot] {
    cursor: pointer;
    z-index: 3;
    width: 30px;
    height: 30px;
    margin-top: -15px;
    margin-left: -15px;
    text-align: center;
    -webkit-transition: -webkit-transform .2s ease-in-out;
    transition: -webkit-transform .2s ease-in-out;
    transition: transform .2s ease-in-out;
    transition: transform .2s ease-in-out,-webkit-transform .2s ease-in-out
}

.amp-dc-image-pic-wrap [data-type=poi-hotspot]:hover {
    -webkit-transition: -webkit-transform .2s ease-in-out;
    transition: -webkit-transform .2s ease-in-out;
    transition: transform .2s ease-in-out;
    transition: transform .2s ease-in-out,-webkit-transform .2s ease-in-out;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg)
}

.amp-dc-image-pic-wrap [data-type=poi-hotspot]:active {
    opacity: .5;
    cursor: default
}

.amp-dc-image-pic-wrap [data-type=poi-hotspot]:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: url(https://dev-solutions.s3.amazonaws.com/poi-js-lib/svg/target.svg) no-repeat 0 0
}

.amp-dc-image-pic-wrap [data-type=poi-hotspot]:before {
    content: '';
    border-radius: 30px;
    -moz-border-radius: 30px;
    -webkit-border-radius: 30px;
    width: 27px;
    height: 27px;
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    margin-left: -13px;
    margin-top: -13px
}

.amp-dc-image-pic-wrap svg {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%
}

.amp-dc-image-pic-wrap svg g polygon {
    fill: transparent;
    opacity: 1;
    stroke: #000;
    stroke-width: 3px;
    stroke-dasharray: 15;
    stroke-linecap: round;
    cursor: pointer
}

@-webkit-keyframes square-anim {
    25% {
        stroke-dasharray: 15;
        opacity: .5
    }

    50% {
        stroke-dasharray: 10;
        opacity: .7
    }

    75% {
        stroke-dasharray: 6;
        opacity: .8
    }

    100% {
        stroke-dasharray: 0;
        opacity: 1
    }
}

.amp-dc-image-pic-wrap svg g:hover polygon {
    -webkit-animation: square-anim .1s 1 ease-out;
    animation: square-anim .1s 1 ease-out;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards
}
`

const DemoImage = ({
    hotspots,
    imageEffect,
    gifImage,
    togglePOI,
    imageholder,
    smallerheight,
    imageAltText
}) => {
    const defaultHost = imageholder.image.image.defaultHost
    const endpoint = imageholder.image.image.endpoint

    // todo: encode uri?
    const imageName = imageholder.image.image.name

    const imageQueryText = imageholder.image.query ? '&' + imageholder.image.query : ''

    let imageEffectClass = ''

    switch (imageEffect) {
        case 'Zoom-in dark':
            imageEffectClass = ' hovereffect ehover1'
            break

        case 'Zoom-in blur':
            imageEffectClass = ' hovereffect ehover3'
            break

        case 'Linear':
            imageEffectClass = ' hovereffect ehover12'
            break

        case 'Double-line Horizontal':
            imageEffectClass = ' hovereffect ehover13'
            break
    }

    return (
        <div
            className={`${hotspots ? 'amp-dc-image-pic-wrap-hotspots ' : ''}amp-dc-image-pic-wrap`}
        >
            {imageEffect == 'Parallax' ? (
                gifImage ? (
                    <div
                        className="o-dc-parrallax"
                        data-ios-disabled="false"
                        data-android-disabled="false"
                        data-parallax="scroll"
                        data-bleed="0"
                        data-position="center center"
                        data-speed="0.0"
                        data-image-src={`https://${endpoint}.a.bigcontent.io/v1/static/${imageName}`}
                        data-mirror-container={`.amp-dc-advanced-banner-mirror-${imageName}`}
                    ></div>
                ) : (
                    <div
                        className={`o-dc-parrallax${
                            smallerheight ? ' o-dc-parrallax-smaller' : ''
                        }`}
                        data-ios-disabled="false"
                        data-android-disabled="false"
                        data-parallax="scroll"
                        data-bleed="0"
                        data-position="center center"
                        data-speed="0.0"
                        data-image-src={`https://${defaultHost}/i/${endpoint}/${imageName}?$poi_old$&w=2560&sm=aspect&aspect=${
                            smallerheight ? 3 : 2
                        }:1&qlt=80`}
                        data-mirror-container={`.amp-dc-advanced-banner-mirror-${imageName}`}
                    ></div>
                )
            ) : (
                <picture className={`amp-dc-image ${imageEffectClass}`}>
                    {gifImage ? (
                        <img
                            loading="lazy"
                            className="amp-dc-image-pic"
                            src={`https://${endpoint}.a.bigcontent.io/v1/static/${imageName}`}
                            alt={imageAltText}
                        />
                    ) : togglePOI ? (
                        <>
                            <source
                                media="(max-width: 640px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?w=640&qlt=75`}
                                type="image/webp"
                            />
                            <source
                                media="(max-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?w=1024&qlt=75`}
                                type="image/webp"
                            />
                            <source
                                media="(min-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?w=1440&qlt=75`}
                                type="image/webp"
                            />
                            <source
                                media="(min-width: 1024px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?w=2000&qlt=75`}
                                type="image/webp"
                            />

                            <source
                                media="(max-width: 640px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?w=640&qlt=75`}
                                type="image/jpeg"
                            />
                            <source
                                media="(max-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?w=1024&qlt=75`}
                                type="image/jpeg"
                            />
                            <source
                                media="(min-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?w=1440&qlt=75`}
                                type="image/jpeg"
                            />
                            <source
                                media="(min-width: 1024px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?w=2000&qlt=75`}
                                type="image/jpeg"
                            />
                            <img
                                loading="lazy"
                                className="amp-dc-image-pic"
                                src={`https://${defaultHost}/i/${endpoint}/${imageName}`}
                                alt={imageAltText}
                            />
                        </>
                    ) : hotspots ? (
                        <>
                            <source
                                media="(max-width: 640px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?w=640&qlt=75`}
                                type="image/webp"
                            />
                            <source
                                media="(max-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?w=1024&qlt=75`}
                                type="image/webp"
                            />
                            <source
                                media="(min-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?w=1440&qlt=75`}
                                type="image/webp"
                            />
                            <source
                                media="(min-width: 1024px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?w=2000&qlt=75`}
                                type="image/webp"
                            />

                            <source
                                media="(max-width: 640px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?w=640&qlt=75`}
                                type="image/jpeg"
                            />
                            <source
                                media="(max-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?w=1024&qlt=75`}
                                type="image/jpeg"
                            />
                            <source
                                media="(min-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?w=1440&qlt=75`}
                                type="image/jpeg"
                            />
                            <source
                                media="(min-width: 1024px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?w=2000&qlt=75`}
                                type="image/jpeg"
                            />
                            <img
                                loading="lazy"
                                className="amp-dc-image-pic"
                                src={`https://${defaultHost}/i/${endpoint}/${imageName}`}
                                alt={imageAltText}
                            />
                        </>
                    ) : (
                        <>
                            <source
                                media="(max-width: 640px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?$poi$${imageQueryText}&w=640&sm=aspect&aspect=1:1&qlt=75`}
                                type="image/webp"
                            />
                            <source
                                media="(max-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?$poi$${imageQueryText}&w=1024&sm=aspect&aspect=4:3&qlt=75`}
                                type="image/webp"
                            />
                            <source
                                media="(min-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?$poi$${imageQueryText}&w=1440&sm=aspect&aspect=2:1&qlt=75`}
                                type="image/webp"
                            />
                            <source
                                media="(min-width: 1024px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}.webp?$poi$${imageQueryText}&w=2000&qlt=75`}
                                type="image/webp"
                            />

                            <source
                                media="(max-width: 640px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?$poi$${imageQueryText}&w=640&sm=aspect&aspect=1:1&qlt=75`}
                                type="image/jpeg"
                            />
                            <source
                                media="(max-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?$poi$${imageQueryText}&w=1024&sm=aspect&aspect=4:3&qlt=75`}
                                type="image/jpeg"
                            />
                            <source
                                media="(min-width: 768px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?$poi$${imageQueryText}&w=1440&sm=aspect&aspect=2:1&qlt=75`}
                                type="image/jpeg"
                            />
                            <source
                                media="(min-width: 1024px)"
                                srcSet={`https://${defaultHost}/i/${endpoint}/${imageName}?$poi$${imageQueryText}&w=2000&qlt=75`}
                                type="image/jpeg"
                            />
                            <img
                                loading="lazy"
                                className="amp-dc-image-pic"
                                src={`https://${defaultHost}/i/${endpoint}/${imageName}?$poi$${imageQueryText}&w=1440&sm=aspect&aspect=${
                                    smallerheight ? 3 : 2
                                }:1&qlt=75`}
                                alt={imageAltText}
                            />
                        </>
                    )}
                    <div className="overlay"></div>
                </picture>
            )}
        </div>
    )
}

DemoImage.displayName = 'DemoImage'

DemoImage.propTypes = {
    hotspots: PropTypes.bool,
    imageEffect: PropTypes.string,
    gifImage: PropTypes.bool,
    togglePOI: PropTypes.bool,
    imageholder: PropTypes.object,
    smallerheight: PropTypes.bool,
    imageAltText: PropTypes.string
}

const getLinkHref = (link) => {
    return link.value
}

/**
 * Simple banner for SFCC demo
 */
const DemoBanner = ({
    bannerImage,
    textPositionLeft,
    textPositionTop,
    textColor,
    bannerColor,
    header,
    subheader,
    description,
    button,
    stackMobileLayout
}) => {
    const show = header || subheader || description || button.label

    return (
        <>
            <style>{css}</style>
            <style>{imagecss}</style>
            <div className="amp-dc-banner js_dc_banner">
                <div className="amp-dc-banner-pic-wrap">
                    <DemoImage {...bannerImage} />
                </div>
                <div
                    className={`amp-dc-banner-info-wrap${
                        stackMobileLayout ? ' amp-dc-info-bottom' : ''
                    }${show ? '' : ' amp-dc-hide'}`}
                    style={{
                        left: (textPositionLeft ?? '10') + '%',
                        top: (textPositionTop ?? '10') + '%'
                    }}
                >
                    <div
                        className="amp-dc-banner-info"
                        style={{
                            color: textColor,
                            background: bannerColor
                        }}
                    >
                        {header && <div className="amp-dc-banner-header">{header}</div>}
                        {subheader && <div className="amp-dc-banner-subheader">{subheader}</div>}
                        {description && (
                            <div className="amp-dc-banner-description">{description}</div>
                        )}
                        {button.label && (
                            <a href={getLinkHref(button)} className="amp-dc-banner-button">
                                {button.label}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

DemoBanner.displayName = 'DemoBanner'

DemoBanner.propTypes = {
    bannerImage: PropTypes.object,
    stackMobileLayout: PropTypes.bool,
    textPositionLeft: PropTypes.string,
    textPositionTop: PropTypes.string,
    textColor: PropTypes.string,
    bannerColor: PropTypes.string,
    header: PropTypes.string,
    subheader: PropTypes.string,
    description: PropTypes.string,
    button: PropTypes.object
}

export default DemoBanner
