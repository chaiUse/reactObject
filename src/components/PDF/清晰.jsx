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
  const exportPDF = (element) => {
    if (element) {

      const pageElement = element

      // 计算缩放比例 ，提高分辨率
      const scale = 5;

      // 使用 html2canvas 生成 PDF
      html2canvas(pageElement, {
        scale: scale, // 缩放生成的画布
      }).then((canvas) => {
        //获取画布的宽高
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        //一页PDF显示html生成的canvas高度
        let pdfPageHeight = (PDFFile.A4[1] / PDFFile.A4[0]) * canvasWidth;
        //未生成pdf的html页面内高度
        let pdfAllHeight = canvasHeight;

        let position = 0;  //页面偏移

        //转换图片为dataURL，参数：图片格式和清晰度(0-1)
        let pageData = canvas.toDataURL('image/jpeg', 1.0);

        //html页面生成的canvas在pdf中图片的宽高
        let imgWidth = PDFFile.A4[0] - 60; //减去边距宽度
        let imgHeight = (canvasHeight / canvasWidth) * PDFFile.A4[0];
        //方向p竖直 l横向，尺寸ponits，格式a4
        let pdf = new jsPDF('p', 'pt', PDFFile.A4);

        const perCanvas = document.createElement('canvas');
        perCanvas.style.backgroundColor = '#fff'
        const context = perCanvas.getContext('2d');
        const img = new Image();
        img.src = pageData;
        const splitCount=Math.ceil(pdfAllHeight / pdfPageHeight)
        for (var i = 0; i <= Math.ceil(pdfAllHeight / pdfPageHeight); i++) {
          const  startY = i * (imgHeight - 100); // 起始y坐标

          // 清空画布
          context.clearRect(0, 0, imgWidth, imgHeight - 100);
          // context.fillStyle = '#fff';
          context.fillRect(0, 0, imgWidth, imgHeight - 100);

          context.drawImage(img, 0, startY, imgWidth, imgHeight - 100, 0, 0, imgWidth, imgHeight - 100);

          const perCanvasData = perCanvas.toDataURL('image/jpeg', 1.0);
          pdf.addImage(perCanvasData, 'JPEG', 0, 50, imgWidth, imgHeight - 100);
          if (i < splitCount - 1) pdf.addPage();

        }

        //#region 
        //  //当内容未超过pdf一页显示的范围，无需分页
        //  if(pdfAllHeight<pdfPageHeight){
        //      // 从图片顶部开始打印   30 左右边距, 0 上下边距
        //      pdf.addImage(pageData, 'jpeg', 10, 0, imgWidth, imgHeight);
        //  }else{
        //      while(pdfAllHeight>0){
        //          pdf.addImage(pageData, 'jpeg', 0, position, imgWidth, imgHeight);
        //          pdfAllHeight-=pdfPageHeight;
        //          position=position -PDFFile.A4[1] ;
        //          console.log('position',position);
        //          //避免添加空白页
        //          if(pdfAllHeight>0){  
        //           pdf.addPage();
        //          }
        //      }
        //  }
        //#endregion

        // for (var i = 1 ; i<= Math.ceil(pdfAllHeight/pdfPageHeight);i++){
        //   if(i>1)pdf.addPage()
        //   pdf.text(-pdfPageHeight*(i-1)+'', 10, 10)
        //   pdf.addImage(pageData, 'jpeg', 0, -PDFFile.A4[1]*(i-1), imgWidth, imgHeight);
        //   pdf.setPage(i)
        //   pdf.text('I am on page 1', 10, 10)
        // }
        pdf.save(`${fileName}.pdf`);
      });

    }
  };

  return exportPDF;
};

export default useCompToPDF;
