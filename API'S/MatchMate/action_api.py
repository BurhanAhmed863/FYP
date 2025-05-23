import math
import cv2
import mediapipe as mp
import os
import numpy as np

def calculate_angle(a, b, c):
    a = np.array([a.x, a.y])
    b = np.array([b.x, b.y])
    c = np.array([c.x, c.y])
    ab = a - b
    bc = c - b
    dot = np.dot(ab, bc)
    ab_len = np.linalg.norm(ab)
    bc_len = np.linalg.norm(bc)
    if ab_len * bc_len == 0:
        return 0
    cos_angle = dot / (ab_len * bc_len)
    cos_angle = np.clip(cos_angle, -1.0, 1.0)
    angle_rad = math.acos(cos_angle)
    angle_deg = math.degrees(angle_rad)
    return angle_deg

def analyze_with_mediapipe(path, bowler_type='fast'):
    print(f"📂 Processing video: {path}, Bowler Type: {bowler_type}")
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        print("❌ Error: Video file not opened.")
        return "No action detected", None, None

    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"📹 Video Info: FPS={fps}, Resolution={width}x{height}, Total Frames={total_frames}")

    # Calculate the frame range for the last second
    last_second_frames = int(fps)
    start_frame = max(0, total_frames - last_second_frames)
    print(f"🔍 Analyzing frames from {start_frame} to {total_frames} (last second)")

    output_path = path.replace('.mp4', '_processed.mp4')
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    if not out.isOpened():
        print("❌ Error: Could not open VideoWriter with mp4v.")
        cap.release()
        return "No action detected", None, None

    mp_pose = mp.solutions.pose
    mp_drawing = mp.solutions.drawing_utils
    pose = mp_pose.Pose(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5,
        model_complexity=2
    )
    angles_last_second = []
    start_angle = None
    end_angle = None
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            print("📢 End of Video reached.")
            break
        frame_count += 1
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb)
        if results.pose_landmarks:
            landmarks = results.pose_landmarks.landmark
            mp_drawing.draw_landmarks(
                frame,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                landmark_drawing_spec=mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=4),
                connection_drawing_spec=mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=2)
            )
            elbow = landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW]
            elbow_x, elbow_y = int(elbow.x * width), int(elbow.y * height)
            cv2.circle(frame, (elbow_x, elbow_y), 8, (255, 0, 0), -1)
            shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
            wrist = landmarks[mp_pose.PoseLandmark.RIGHT_WRIST]
            angle = calculate_angle(shoulder, elbow, wrist)

            # Process angles only in the last second
            if frame_count >= start_frame:
                angles_last_second.append(angle)
                # Set start angle at the first valid frame of the last second
                if start_angle is None:
                    start_angle = angle
                # Update end angle for each valid frame (last one will be kept)
                end_angle = angle
                print(f"📷 Frame {frame_count}: Elbow Angle = {angle:.2f} degrees")
                cv2.putText(frame, f"Angle: {angle:.2f}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            else:
                print(f"📷 Frame {frame_count}: Elbow Angle = {angle:.2f}, Outside last second")
        else:
            print(f"⚠️ Frame {frame_count}: No pose detected.")
            cv2.putText(frame, "No Pose Detected", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        out.write(frame)

    cap.release()
    out.release()
    pose.close()

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
        print("❌ Error: Processed video not generated or empty.")
        if os.path.exists(output_path):
            os.remove(output_path)
        return "No action detected", None, None

    if not angles_last_second:
        print("❌ No angles detected in the last second.")
        if os.path.exists(output_path):
            os.remove(output_path)
        return "No action detected", None, None

    print(f"🎯 Start Angle: {start_angle:.2f} degrees, End Angle: {end_angle:.2f} degrees")

    # Evaluate based on start and end angles
    result = "Legal Action" if (start_angle >= 150 and end_angle <= 185) else "Illegal Action"

    print(f"📬 Returning: result={result}, output_path={output_path}, end_angle={end_angle:.2f}")
    return result, output_path, end_angle