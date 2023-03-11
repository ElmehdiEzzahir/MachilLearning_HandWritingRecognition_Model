let canvas
let context
let paint
let clickX = []
let clickY = []
let clickDrag = []
let deletedh


function startCanvas() {
  canvas = document.getElementById("canvas")
  context = canvas.getContext("2d")
  const canvasW = canvas.width;
  const canvasH = canvas.height;

  context.strokeStyle = "#FFFFFF"
  context.lineJoin = "round"
  context.lineWidth = 12

  canvas.addEventListener("touchstart", function (e) {
    var touch = e.touches[0]
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    })
    canvas.dispatchEvent(mouseEvent)
  })

  canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0]
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    })
    canvas.dispatchEvent(mouseEvent)
  })

  canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup")
    canvas.dispatchEvent(mouseEvent)
  })

  $('#canvas').mousedown(function (e) {
    paint = true
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false)
    drawCanvas()
  })

  $('#canvas').mousemove(function (e) {
    if (paint) {
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true)
      drawCanvas()
    }
  })

  $('#canvas').mouseup(function (e) {
    paint = false
    drawCanvas()
  })

  $('#canvas').mouseleave(function (e) {
    paint = false
  })
}


function addClick(x, y, dragging) {
  clickX.push(x)
  clickY.push(y)
  clickDrag.push(dragging)
}

function clearCanvas() {
  canvas = document.getElementById("canvas")
  context = canvas.getContext("2d")
  const canvasW = canvas.width;
  const canvasH = canvas.height;
  context.clearRect(0,0, canvasW, canvasH)

}

function resetCanvas() {
  clickX = []
  clickY = []
  clickDrag = []
  clearCanvas()
}

function drawCanvas() {
  clearCanvas()

  for(let i=0; i<clickX.length; i++) {
    context.beginPath()
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1])
    } else {
      context.moveTo(clickX[i] - 1, clickY[i])
    }
    context.lineTo(clickX[i], clickY[i])
    context.closePath()
    context.stroke()
  }
}

function getPixels() {
  let pixelslist=[]
  for (i=0;i<8;i++){
    let initPixels=[]
    let _pixels = []
    let pixels = []
    initPixels = context.getImageData(140*i, 0, 140, 140).data
    for (n=0; n < initPixels.length; n += 4) {
      _pixels.push(initPixels[n + 3])
    }
    for (n=0; n < _pixels.length; n += 700) {
      for (j=0; j < 140; j += 5) {
        pixels.push(_pixels[n+j])
      }
    }
    pixelslist.push(pixels)
  }
    
  return pixelslist
  
  }

function predict() {
  let pixels = getPixels()
  document.getElementById("pixels").value = pixels
  document.getElementById("prediction").submit()

}
// function undoh(){
// i=980
// for (i=0;i<8;i++){
//   let initPixels=[]
//   let _pixels = []
//   initPixels = context.getImageData(i, 0, 140, 140).data
//   for (n=0; n < initPixels.length; n += 4) {
//     _pixels.push(initPixels[n + 3])
//   }
//   parseInt(_pixels)
//   var sum = _pixels.reduce
//   if (sum==0){deletedh=i 
//     break}
//     i=i-140
// }
// return deletedh
// }
//   function undo(){
//     deletedh=undoh()
//     canvas = document.getElementById("canvas")
//     context = canvas.getContext("2d")
//     context.clearRect(deletedh,0,140, 140)
//     // console.log(deleted)
//   }
// console.log(typeof "pixels")





 // pixels,pixels2,pixels3,pixels4,
// function dataURLtoBin(dataURL) {
//   // convert base64/URLEncoded data component to raw binary data held in a string
//   var byteString;
//   if (dataURL.split(",")[0].indexOf("base64") >= 0)
//     byteString = atob(dataURL.split(",")[1]);
//   else byteString = decodeURI(dataURI.split(",")[1]);
//   // separate out the mime component
//   var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
//   // write the bytes of the string to a typed array
//   var ia = new Uint8Array(byteString.length);
//   for (var i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   return new Blob([ia], { type: mimeString });
// }
// function toimage(){
//   canvas = document.getElementById("canvas")
//   var myimage = new Image();
//   myimage.src=canvas.DataURI;
//   myimage= dataURLtoBin(myimage)
//   return myimage;
// }


// let restore_array = [];
// function Restore() {
//   if (start_index <= 0) {
//     Clear()
//   } else {
//     start_index += -1;
//     restore_array.pop();
//     if ( e.type != 'mouseout' ) {
//       context.putImageData(restore_array[start_index], 0, 0);
//     }
//   }
// }
// let initPixels = context.getImageData(0, 0, 168, 168).data
  // let initPixels2 = context.getImageData(168, 0, 168, 168).data
  // let initPixels3 = context.getImageData(168*2, 0, 168, 168).data
  // let initPixels4 = context.getImageData(168*3, 0, 168, 168).data
  // let initPixels5 = context.getImageData(168*4, 0, 168, 168).data
  // let _pixels = []
  // let pixels = []
  // let _pixels2 = []
  // let pixels2 = []
  // let _pixels3 = []
  // let pixels3 = []
  // let _pixels4 = []
  // let pixels4 = []
  // let _pixels5 = []
  // let pixels5 = []

  // for (i=0; i < initPixels5.length; i += 4) {
  //   _pixels.push(initPixels[i + 3])
  //   _pixels2.push(initPixels2[i + 3])
  //   _pixels3.push(initPixels3[i + 3])
  //   _pixels4.push(initPixels4[i + 3])
  //   _pixels5.push(initPixels5[i + 3])
  // }
  // for (i=0; i < _pixels5.length; i += 700) {
  //   for (j=0; j < 140; j += 5) {
  //     pixels.push(_pixels[i+j])
  //     pixels2.push(_pixels2[i+j])
  //     pixels3.push(_pixels3[i+j])
  //     pixels4.push(_pixels4[i+j])
  //     pixels5.push(_pixels5[i+j])
  //   }
  // }
  // console.log(pixels5)