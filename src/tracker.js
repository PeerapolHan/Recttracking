export class EuclideanDistTracker {
    constructor() {
        // Store the center positions of the objects
        this.center_points = {};
        // Keep the count of the IDs
        // each time a new object id detected, the count will increase by one
        this.id_count = 0;
    }

    update(objects_rect) {
        // Objects boxes and ids
        let objects_bbs_ids = [];

        // Get center point of new object
        for (const rect of objects_rect) {
            let [x, y, width, height] = rect;
            let cx = Math.floor((x + x + width) / 2);
            let cy = Math.floor((y + y + height) / 2);

            // Find out if that object was detected already
            let same_object_detected = false;
            console.log('this.center_points',this.center_points);
            for (let id in this.center_points) {
                let pt = this.center_points[id];
                let dist = Math.hypot(cx - pt[0], cy - pt[1]);

                if (dist < 40) {
                    this.center_points[id] = [cx, cy];
                    console.log(this.center_points);
                    objects_bbs_ids.push([x, y, width, height, id]);
                    same_object_detected = true;
                    break;
                }
            }

            // New object is detected, assign the ID to that object
            if (!same_object_detected) {
                this.center_points[this.id_count] = [cx, cy];
                objects_bbs_ids.push([x, y, width, height, this.id_count]);
                this.id_count++;
            }
        }

        // Clean the dictionary by center points to remove IDS not used anymore
        let new_center_points = {};
        for (let obj_bb_id of objects_bbs_ids) {
            let [, , , , object_id] = obj_bb_id;
            let center = this.center_points[object_id];
            new_center_points[object_id] = center;
        }

        // Update dictionary with IDs not used removed
        this.center_points = { ...new_center_points };

        return objects_bbs_ids;
    }
}
