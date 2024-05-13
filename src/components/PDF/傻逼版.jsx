import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
import React, { useRef, cloneElement } from 'react';

const PDFFile = {
  A4: [592.28, 841.89],
};

const useCompToPDF = (props) => {
  // 获取导出文件名
  const { fileName, resolutionScale } = props;
  const clonedRef = useRef(null);
  const exportPDF = async (element ) => {
    if (element) {
      // 存储各个分页的留白高度
      let zancunH = [];

      // 判断节点是否被分割
      function isSplit(nodes, index, pageHeight) {
        if (nodes[index].offsetTop + nodes[index].scrollHeight < pageHeight && nodes[index + 1] && nodes[index + 1].offsetTop + nodes[index + 1].scrollHeight > pageHeight) {
          return true; // 节点被分割
        } else {
          return false; // 节点未被分割
        }
      }

      // 输出PDF方法
      function  outPutPdfFn () {
        // 将页面滚动条置顶
        element.scrollTop = 0;
        element.scrollLeft = 0;

        // A4纸张宽度和高度
        const A4_WIDTH = 592.28;
        const A4_HEIGHT = 841.89;

        // 获取图片容器和页面高度
        let imageWrapper = element;
        console.log(imageWrapper);
        let pageHeight = (imageWrapper.scrollWidth / A4_WIDTH) * A4_HEIGHT;

        // 获取所有需要分割的节点
        let lableListID = imageWrapper.querySelectorAll('div');

        // 初始化分页留白数组
        zancunH[0] = 0;

        // 遍历节点，判断是否需要分割并添加留白节点
        for (let i = 0; i < lableListID.length; i++) {
          let multiple = Math.ceil((lableListID[i].offsetTop + lableListID[i].scrollHeight) / pageHeight);
          if (isSplit(lableListID, i, multiple * pageHeight)) {
            let divParent = lableListID[i].parentNode; // 获取节点的父节点
            let newNode = document.createElement('div');
            newNode.className = 'emptyDiv';
            newNode.style.background = '#ffffff';
            newNode.innerText='6'
            let _H = multiple * pageHeight - (lableListID[i].offsetTop + lableListID[i].scrollHeight);
            zancunH[multiple] = _H;
            newNode.style.height = _H + 'px'; // 设置留白节点高度
            newNode.style.width = '100%';
            let next = lableListID[i].nextSibling; // 获取节点的下一个兄弟节点
            if (next) {
              divParent.insertBefore(newNode, next); // 将留白节点插入到下一个兄弟节点之前
            } else {
              divParent.appendChild(newNode); // 将留白节点添加到最后
            }
          }
        }

        // 使用html2Canvas进行截图
        html2Canvas(imageWrapper, { // 使用html2Canvas进行截图
          scale: 3, // 图片放大倍数，提高清晰度
        })
          .then(async (res) => {
            const scale = 3
            // 创绘制切割后绘制canvas用的canvas标签以及对应的context对象
            const perCanvas = document.createElement('canvas');
            perCanvas.style.backgroundColor = '#fff'
            const context = perCanvas.getContext('2d');

            // 将需要下载的html标签转成canvas标签，并获取对应的base64码
            const elem = element;
            console.log(elem);
            const canvas = await html2Canvas(elem, {
              scale: scale, // 缩放生成的画布

            });
            console.log('canvas', elem,canvas);
            const canvasData = canvas.toDataURL('image/jpeg', 1.0);

            // pdf的尺寸
            const pdfWidth = canvas.width;
            const pdfHeight = pdfWidth * 1.414;

            //切割后的canvas图片的宽高，就等于每页pdf的宽高
            perCanvas.width = canvas.width;
            perCanvas.height = pdfHeight;

            // 每张图片的高度：适当减少100，上下各留50页边距
            const perHeight = pdfHeight - 96 * scale;

            // 计算切割次数
            let splitCount = Math.ceil(canvas.height / perHeight);
            if (splitCount * perHeight < canvas.height) splitCount++;

            // //创建img对象，加载完整的canvas图片
            const img = new Image();
            img.src = canvasData;

            //创建pdf对象
            const pdf = new JsPDF('p', 'pt', [pdfWidth, pdfHeight]);
            //待图片加载完成
            await setTimeout(() => { }, 5000)

            //切割canvas图片，贴到每一页pdf中
            for (let i = 0; i < splitCount; i++) {
              const startY = i * perHeight; // 起始y坐标

              // 清空画布
              context.clearRect(0, 0, perCanvas.width, pdfHeight);
              context.fillStyle = '#fff';
              context.fillRect(0, 0, perCanvas.width, pdfHeight);

              // 绘制当前切割区域的图片
              context.drawImage(img, 0, startY, perCanvas.width, perHeight, 0, 0, perCanvas.width, perHeight);
              // context.scale(.2, .2);
              const perCanvasData = perCanvas.toDataURL('image/jpeg', 1.0);
              
              pdf.addImage(perCanvasData, 'JPEG', 0, 50 * scale, perCanvas.width, perCanvas.height);
              if (i < splitCount - 1) pdf.addPage();
            };



            pdf.save(`${fileName}.pdf`);
          })
          .then(() => {
            // 下载成功提示
            console.log({
              message: '文件下载成功',
              type: 'success',
            });
          })
          .catch((error) => {
            // 下载失败提示
            console.error('PDF 文件保存失败:', error);
            // ElMessage.error('文件下载失败');
          });
      }
      outPutPdfFn()
    }
  };

  return exportPDF;
};

export default useCompToPDF;
