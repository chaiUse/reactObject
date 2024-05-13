

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
  const exportPDF = async (ele) => {
    let element = await ele.cloneNode(true);
    element.style.position = 'fixed'
    element.style.bottom = '100%'
    // element.style.bottom='0'
    element.style.left = '0'
    element.style.zIndex = 1
    ele.appendChild(element)
    if (element) {
      const scale = 3
      // 创绘制切割后绘制canvas用的canvas标签以及对应的context对象
      const perCanvas = document.createElement('canvas');
      perCanvas.style.backgroundColor = '#fff'
      const context = perCanvas.getContext('2d');

      // 将需要下载的html标签转成canvas标签，并获取对应的base64码
      const elem = element;
      const canvas = await html2canvas(elem, {
        scale: scale, // 缩放生成的画布
      });

      // pdf的尺寸
      const pdfWidth = canvas.width;
      const pdfHeight = pdfWidth * 1.414;

      //切割后的canvas图片的宽高，就等于每页pdf的宽高
      perCanvas.height = pdfHeight;

      // 每张图片的高度：适当减少100，上下各留50页边距
      const perHeight = pdfHeight - 100;


      let promise = async (element) => {

        // 获取图片容器和页面高度
        let imageWrapper = element;
        // console.log(element, imageWrapper);

        // 获取所有需要分割的节点
        let lableListID = imageWrapper.querySelectorAll('li');
        // console.log(imageWrapper.getBoundingClientRect());
        let num = 0
        let aaa = 0
        for (let i = 0; i < lableListID.length; i++) {
          let multiple = (lableListID[i].getBoundingClientRect().top - imageWrapper.getBoundingClientRect().top + lableListID[i].scrollHeight) / (perHeight / scale);

          console.log(lableListID[i],lableListID[i].getBoundingClientRect().top-imageWrapper.getBoundingClientRect().top,multiple,lableListID[i].scrollHeight,perHeight);
          console.log(lableListID[i].getBoundingClientRect(),imageWrapper.getBoundingClientRect());
          console.log(multiple,num,aaa);
          if (multiple > aaa) {
            console.log(multiple,num);
            console.log(aaa + '分页-------------------------------------------------------------------------------------------------------------------------------------------------------------');
            aaa = aaa + 1
          }
          if (multiple % 1 < num) {
            // console.log('添加页面', (multiple % 1), 1 - num, lableListID[i]);
            console.log(multiple,num);

            let divParent = lableListID[i].parentNode; // 获取节点的父节点
            let newNode = document.createElement('div');
            newNode.className = 'emptyDiv';
            newNode.style.background = '#fff';
            newNode.innerText = ''
            // let _H = (1 - num) * (perHeight / scale) + 'px';
            let _H = (1 - num) * (perHeight  / scale ) + 'px';
            // zancunH[multiple] = _H;
            newNode.style.height = _H; // 设置留白节点高度
            newNode.style.width = '100%';
            // console.log('将留白节点插入到下一个兄弟节点之前');
            console.log(newNode);
            await divParent.insertBefore(newNode, lableListID[i]); // 将留白节点插入到下一个兄弟节点之前
          }
          num = multiple % 1

        }

        // await setTimeout(async () => {
        if (imageWrapper) {
          // const scale = 1
          // 创绘制切割后绘制canvas用的canvas标签以及对应的context对象
          const perCanvas = document.createElement('canvas');
          perCanvas.style.backgroundColor = '#fff'
          const context = perCanvas.getContext('2d');

          // 将需要下载的html标签转成canvas标签，并获取对应的base64码
          const elem = element;
          // console.log(elem);
          const canvas = await html2canvas(elem, {
            scale: scale, // 缩放生成的画布

          });
          // console.log('canvas', canvas);
          const canvasData = canvas.toDataURL('image/jpeg', 1.0);

          // pdf的尺寸
          const pdfWidth = canvas.width;
          const pdfHeight = pdfWidth * 1.414;

          //切割后的canvas图片的宽高，就等于每页pdf的宽高
          perCanvas.width = canvas.width;
          perCanvas.height = pdfHeight;

          // 每张图片的高度：适当减少100，上下各留50页边距
          const perWidth = pdfWidth - 50;
          const perHeight = pdfHeight - 100;

          // console.log('页面切割高2', perHeight);
          // 计算切割次数
          let splitCount = Math.ceil(canvas.height / perHeight);
          // console.log(splitCount,canvas.height,perHeight);
          if (splitCount * perHeight < canvas.height) splitCount++;

          // //创建img对象，加载完整的canvas图片
          const img = new Image();
          img.src = canvasData;
          //创建pdf对象
          const pdf =await new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
          //待图片加载完成
          // setTimeout(() => { })

          //切割canvas图片，贴到每一页pdf中
          for (let i = 0; i < splitCount; i++) {
            const startY = i * perHeight; // 起始y坐标

            // 清空画布
            context.clearRect(0, 0, perCanvas.width, pdfHeight);
            context.fillStyle = '#fff';
            context.fillRect(0, 0, perCanvas.width, pdfHeight);

            // 绘制当前切割区域的图片
            context.drawImage(img, 0, startY, perCanvas.width, perHeight, 0, 0, perWidth, perHeight);
            // context.scale(.2, .2);
            const perCanvasData = perCanvas.toDataURL('image/jpeg', 1.0);
            pdf.addImage(perCanvasData, 'JPEG', 25, 50, perCanvas.width, perCanvas.height);
            if (i < splitCount - 1) pdf.addPage();
          };



          pdf.save(`${fileName}6.pdf`);

          ele.removeChild(element)
          // 获取所有分割的节点
          let removeDOM = imageWrapper.querySelectorAll('.emptyDiv');
          if (removeDOM) {
            removeDOM.forEach((a, b) => {
              let removeDOMParent = a.parentNode; // 获取节点的父节点
              // removeDOMParent.removeChild(a)
            })
          }


        }

        // },5000)
        return true
      }
      return promise(element)


    }
  };

  return exportPDF;
};

export default useCompToPDF;



