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
    name: '云原生AI星球',
    icon: '/assets/icon/cloudai.png',
    img: '/assets/qrcode/cloudai.png',
    bottomText: '',
}, {
    name: '加交流群',
    icon: '/assets/icon/weixin.png',
    topText: '加好友拉进群',
    img: '/assets/qrcode/定刷群二维码.png',
    bottomText: 'PS：添加时请备注 <b>入群</b>',
}, {
    name: '下载资料',
    icon: '/assets/icon/xiazai.png',
    topText: '<span style="font-size:0.8rem;font-weight:bold;">扫码公众号，回复 <span style="color:red;">资料</span></span>',
    img: '/assets/qrcode/令飞编程微信公众号.png',
    bottomText: '',
}, {
    name: '关公众号',
    icon: '/assets/icon/gongzhonghao.png',
    topText: '欢迎扫码关注我的公众号',
    img: '/assets/qrcode/令飞编程微信公众号.png',
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
