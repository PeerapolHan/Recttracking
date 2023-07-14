import { EuclideanDistTracker } from "./tracker.js";
let tracker = new EuclideanDistTracker();

export const drawRect = (detections, ctx) => {
  // Loop through each prediction
  let detectionspush = [];
  detections.forEach(prediction => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction['bbox'];
    const text = prediction['class'];
    let cx = parseInt((x + x + width) / 2)
    let cy = parseInt((y + y + height) / 2)
  
    // Set styling
    ctx.strokeStyle = 'red'
    ctx.font = '40px Arial';
    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = 'red'
    ctx.fillText(text, x, y);
    ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.rect(x, y, width, height);
    ctx.stroke();
    detectionspush.push([x, y, width, height]);
  });

  //object tracking
  const boxes_ids = tracker.update(detectionspush);
  for(let box_id of boxes_ids){
    let [x, y, width, height, id] = box_id;
    ctx.fillText(id, x-90, y);
    console.log(id)
  }
  // console.log(id)
}
