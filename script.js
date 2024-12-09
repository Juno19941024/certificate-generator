// 等待页面加载完成
window.onload = function() {
    // 初始化画布
    const canvas = document.getElementById('certificateCanvas');
    canvas.width = 982;
    canvas.height = 1184;
}

// 生成证书函数
async function generateCertificate() {
    console.log('开始生成证书...');
    
    // 获取用户输入
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const date = document.getElementById('date').value;
    
    // 验证输入
    if (!name || !subject || !date) {
        alert('请填写所有信息！');
        return;
    }
    
    // 根据科目确定称号
    const title = subject === '科目一' ? '理论大师' : '车神之神';
    
    // 获取画布
    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');
    
    try {
        // 加载模板图片
        const img = new Image();
        img.crossOrigin = 'anonymous';  // 添加跨域支持
        console.log('开始加载图片...');
        
        // 使用 Promise 包装图片加载
        await new Promise((resolve, reject) => {
            img.onload = () => {
                console.log('图片加载成功');
                resolve();
            };
            img.onerror = (error) => {
                console.error('图片加载失败:', error);
                reject(new Error('图片加载失败'));
            };
            // 添加时间戳防止缓存
            img.src = 'template.jpg?' + new Date().getTime();
        });
        
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制模板图片
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        console.log('图片绘制完成');
        
        // 设置文字样式
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        
        // 绘制姓名
        ctx.font = '24px Arial';
        ctx.fillText(name, 250, 385);
        
        // 绘制科目
        ctx.fillText(subject, 692, 464);
        
        // 绘制称号
        ctx.font = 'bold 64px Arial';
        ctx.fillText(title, 450, 659);
        
        // 绘制日期
        ctx.font = '24px Arial';
        ctx.fillText(formatDate(date), 730, 1015);
        
        console.log('证书生成完成');
        
    } catch (error) {
        console.error('生成证书时出错:', error);
        alert('生成证书时出现错误：' + error.message);
    }
}

// 格式化日期函数
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 添加下载证书函数
function downloadCertificate() {
    console.log('开始下载处理...');
    
    const canvas = document.getElementById('certificateCanvas');
    if (!canvas) {
        console.error('找不到画布元素');
        return;
    }
    
    try {
        // 直接将画布转换为Blob
        canvas.toBlob(function(blob) {
            if (!blob) {
                console.error('无法生成图片数据');
                alert('生成图片数据失败，请重试！');
                return;
            }
            
            // 创建下载链接
            const date = new Date();
            const fileName = `证书_${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}_${date.getHours().toString().padStart(2,'0')}${date.getMinutes().toString().padStart(2,'0')}.png`;
            
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = fileName;
            link.href = url;
            
            // 触发下载
            document.body.appendChild(link);
            link.click();
            
            // 清理
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            console.log('下载完成');
        }, 'image/png');
        
    } catch (error) {
        console.error('下载过程出错:', error);
        alert('下载过程出现错误，请重试！');
    }
} 