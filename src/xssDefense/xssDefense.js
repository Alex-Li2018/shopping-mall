import he from "./he.js"
import hp from "./htmlParse.js"

//解码的操作 储存性XSS时使用,解析后台返回的内容
export function xssDefenseUncode (str) {
    // str假如为某个DOM字符串
    // 1. result为处理之后的DOM节点
    let result = ''
    // 2. 解码
    let decode = he.unescape(str, {
        strict: true
    })

    console.log(decode)
    hp.HTMLParser(decode, {
        start (tag, attrs, unary) {
            // 3. 过滤常见危险的标签
            if (tag === 'script' || tag === 'img' || tag === 'link' || tag === 'style' || tag === 'iframe' || tag === 'frame') return
            result += `<${tag}`
            for (let i = 0; i < attrs.length; i++) {
                let name = (attrs[i].name).toLowerCase()
                let value = attrs[i].escaped
                // 3. 过滤掉危险的style属性和js事件
                if (name === 'style' || name === 'href' || name === 'src' || ~name.indexOf('on')) continue
                result += ` ${name}=${value}`
            }
            result += `${unary ? ' /' : ''} >`
        },
        chars (text) {
            result += text
        },
        comment (text) {
            result += `<!-- ${text} -->`
        },
        end (tag) {
            result += `</${tag}>`
        }
    })
    return result
}

//转码的操作(encode) 反射型XSS攻击时使用
export function xssDefenseEncode (str) {
    return he.escape(str, {
        strict: true
    })
}


