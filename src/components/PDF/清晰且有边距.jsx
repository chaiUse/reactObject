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
    if (element) {
      const scale =4
      // 创绘制切割后绘制canvas用的canvas标签以及对应的context对象
      const perCanvas = document.createElement('canvas');
      perCanvas.style.backgroundColor = '#fff'
      const context = perCanvas.getContext('2d');

      // 将需要下载的html标签转成canvas标签，并获取对应的base64码
      const elem = element;
      const canvas = await html2canvas(elem, {
        scale: scale, // 缩放生成的画布
        
        
      });
      console.log('canvas',canvas);
      const canvasData = canvas.toDataURL('image/jpeg', 1.0);

      // pdf的尺寸
      const pdfWidth = canvas.width;
      const pdfHeight = pdfWidth * 1.414;

      //切割后的canvas图片的宽高，就等于每页pdf的宽高
      perCanvas.width = canvas.width;
      perCanvas.height = pdfHeight;

      // 每张图片的高度：适当减少100，上下各留50页边距
      const perHeight = pdfHeight - 96*scale;

      // 计算切割次数
      let splitCount = Math.ceil(canvas.height / perHeight);
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
        pdf.addImage(perCanvasData, 'JPEG', 0, 50*scale, perCanvas.width, perCanvas.height);
        if (i < splitCount - 1) pdf.addPage();
      };
      
       
    
      pdf.save(`${fileName}.pdf`);


    }
  };

  return exportPDF;
};

export default useCompToPDF;
