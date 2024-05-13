

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef, cloneElement } from 'react';

const PDFFile = {
  A4: [592.28, 841.89],
};

const useCompToPDF = (props) => {
  // 获取导出文件名
  const { fileName, resolutionScale } = props;
  const clonedRef = useRef(null);
  const exportPDF = async (element) => {
    console.log(element);
    if (element) {
      //计算页面大小，调整导出清晰度的变量 取值0-5， 5导出的时候可能发生崩溃
      const scale = 1
          //#region  计算所需要的变量 页面所需要的宽高

        // 创绘制切割后绘制canvas用的canvas标签以及对应的context对象
        // 创建画布
        const perCanvas = document.createElement('canvas');
        // 画布背景色
        perCanvas.style.backgroundColor = '#fff'
        // 创建画笔
        const context = perCanvas.getContext('2d');
        // 将需要下载的html标签转成canvas标签，并获取对应的base64码
        const elem = element;
        const canvas = await html2canvas(elem, {
          scale: scale, // 缩放生成的画布 提升清晰度
        });
        // 将画布生成图片
        const canvasData = canvas.toDataURL('image/jpeg', 1.0);

        // pdf的尺寸，宽为图片的宽 高为A4纸比值生成
        const pdfWidth = canvas.width;
        const pdfHeight = pdfWidth * 1.414;

        //切割后的canvas图片的宽高，就等于每页pdf的宽高
        perCanvas.width = canvas.width;
        perCanvas.height = pdfHeight;

        // 每张图片的高度：适当减少100，上下各留50页边距
        const perHeight = pdfHeight - 100 * scale;

        // 计算切割次数
        let splitCount = Math.ceil(canvas.height / perHeight);
        //#endregion

      // 导出函数  计算页面大小，算出会出现页面分割文字部分 添加div防止文字被切割
      //将页面生成画布，并进行切割，此举是为了产生上下边距
      let promise = async (element) => {
      
        // 获取图片容器和页面高度
        let imageWrapper = element;

        // 获取所有需要分割的节点
        let lableListID = imageWrapper.querySelectorAll('li');
        let num = 0

        for (let i = 0; i < lableListID.length; i++) {
          let multiple = (lableListID[i].getBoundingClientRect().top - imageWrapper.getBoundingClientRect().top + lableListID[i].scrollHeight) / (perHeight);
          console.log(lableListID[i],lableListID[i].getBoundingClientRect().top-imageWrapper.getBoundingClientRect().top,multiple,perHeight);
          console.log(lableListID[i].getBoundingClientRect(),imageWrapper.getBoundingClientRect());
          console.log(multiple,num);
          if (multiple % 1 < num) {


            let divParent = lableListID[i].parentNode; // 获取节点的父节点
            let newNode = document.createElement('div');
            newNode.className = 'emptyDiv';
            newNode.style.background = '#000';
            newNode.innerText = ''
            let _H = (1 - num) * perHeight  + 'px';
            newNode.style.height = _H; // 设置留白节点高度
            newNode.style.width = '100%';
            let next = lableListID[i].nextElementSibling; // 获取节点的下一个兄弟节点
            if (next) {
              await divParent.insertBefore(newNode, lableListID[i]); // 将留白节点插入到下一个兄弟节点之前
            } else {
              await divParent.appendChild(newNode); // 将留白节点添加到最后
            }

          }
          num = multiple % 1

        }

        setTimeout(async () => {
          if (imageWrapper) {
              //#region  计算所需要的变量 页面所需要的宽高

        // 创绘制切割后绘制canvas用的canvas标签以及对应的context对象
        // 创建画布
        const perCanvas = document.createElement('canvas');
        // 画布背景色
        perCanvas.style.backgroundColor = '#fff'
        // 创建画笔
        const context = perCanvas.getContext('2d');
        // 将需要下载的html标签转成canvas标签，并获取对应的base64码
        const elem = element;
        const canvas = await html2canvas(elem, {
          scale: scale, // 缩放生成的画布 提升清晰度
        });
        // 将画布生成图片
        const canvasData = canvas.toDataURL('image/jpeg', 1.0);

        // pdf的尺寸，宽为图片的宽 高为A4纸比值生成
        const pdfWidth = canvas.width;
        const pdfHeight = pdfWidth * 1.414;

        //切割后的canvas图片的宽高，就等于每页pdf的宽高
        perCanvas.width = canvas.width;
        perCanvas.height = pdfHeight;

        // 每张图片的高度：适当减少100，上下各留50页边距
        const perHeight = pdfHeight - 100 * scale;

        // 计算切割次数
        let splitCount = Math.ceil(canvas.height / perHeight);
        //#endregion

            if (splitCount * perHeight < canvas.height) splitCount++;
            // //创建img对象，加载完整的canvas图片
            const img = new Image();
            img.src = canvasData;
            //创建pdf对象
            const pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
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
            pdf.save(`${fileName}6.pdf`);
            
        let removeDOM = imageWrapper.querySelectorAll('.emptyDiv');
        
        
        if(removeDOM){
          console.log(removeDOM);
          removeDOM.forEach((a,b)=>{
            let removeDOMParent = a.parentNode; // 获取节点的父节点
            removeDOMParent.removeChild(a)
          })
        }

          }

        })
      }
      promise(element)



    }
  };

  return exportPDF;
};

export default useCompToPDF;



