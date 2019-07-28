import Vue from 'vue'
import PubSub from 'pubsub-js'
import $Http from './config/http.js'


let Plugin = {
    install() {
        const $bus = {
            emit: function (eventId,data) { 
                //消息同步发布
                PubSub.publishSync('global-bus'+ "-" + eventId,data)
            },
        
            emitAsync: function(eventId,data) {
                //消息异步发布
                PubSub.publish('global-bus'+ "-" + eventId,data)
            },
        
            on: function(eventId,cb) {
                PubSub.subscribe('global-bus'+ "-" + eventId,function(msg,data){
                    cb(data)
                })
            },
        
            off: function(...eventIds) {
                eventIds.forEach(_ => {
                    PubSub.unsubscribe('global-bus'+ "-" + _)
                })
            }
        }
        
        //挂载到window上面
        window.$bus = $bus;
        //挂载axios的请求
        window.$Http = $Http
    }
} 

Vue.use(Plugin)

console.log('global.js is Ready')
