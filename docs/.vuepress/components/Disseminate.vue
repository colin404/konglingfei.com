<template>
    <div class="disseminate">
        <div v-for="item in list" class="disseminate-item" :key="item.name">
            <img :src="item.icon" :alt="item.name" width="24px">
            <span class="name">{{ item.name }}</span>
            <div class="disseminate-item-content">
                <div class="top-text" v-html="item.topText"></div>
                <img :src="item.img" style="margin: 5px;" height="180px" :alt="item.name">
                <div class="bottom-text" v-html="item.bottomText"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="jsx">
const list = [{
    name: '手机看',
    icon: '/assets/icon/mobile.png',
    topText: '微信扫一扫',
    img: '/assets/qrcode/个人网站二维码.png',
    bottomText: '可以手机看或分享至朋友圈',
}, {
    name: '星球',
    icon: '/assets/icon/xingqiu.png',
    topText: '一个可以助你进阶为Go+云原生高级开发工程师的实战星球',
    img: '/assets/qrcode/知识星球-无优惠.png',
    bottomText: '',
}, {
    name: '交流群',
    icon: '/assets/icon/weixin.png',
    topText: '添加微信，进Go项目开发交流群',
    img: '/assets/qrcode/个人微信号.png',
    bottomText: 'PS：添加时请备注 <b>入群</b>',
}, {
    name: '下资料',
    icon: '/assets/icon/xiazai.png',
    topText: '<span style="font-size:0.8rem;font-weight:bold;">扫码公众号，回复 <span style="color:red;">资料</span> 获取海量编程学习资源「无任何套路」</span>',
    img: '/assets/qrcode/公众号-令飞编程.png',
    bottomText: '',
}]
</script>

<style scoped>
.disseminate {
    position: fixed;
    right: 10px;
    display: flex;
    flex-direction: column;
    z-index: 99;
    top: calc(var(--navbar-height) + 50px);
}

.disseminate-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 60px;
    border-bottom: 1px solid #eee;
    position: relative;
}


.disseminate-item-content {
    position: absolute;
    top: 0;
    right: 40px;
    width: 200px;
    display: none;
    font-size: 12px;
    flex-direction: column;
    align-items: center;
    background-color: white;
    justify-content: center;
    border: 1px solid #eee;
    padding: 10px;
    z-index: -1;
}

.disseminate-item:hover .disseminate-item-content {
    display: flex;
}

.name {
    color: grey;
    margin-top: 3px;
    font-size: 11px;
}
</style>
