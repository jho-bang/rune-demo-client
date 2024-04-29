export async function inpaint({ width, height, image, mask }) {
  const request_data = {
    controlnet_conditioning_scale: 0.4,
    controlnet_method: "",
    croper_height: 512,
    croper_width: 512,
    croper_x: -6,
    croper_y: 120,
    cv2_flag: "INPAINT_NS",
    cv2_radius: 5,
    enable_controlnet: false,
    hd_strategy: "Crop",
    ldm_sampler: "ddim",
    extender_width: width,
    extender_height: height,
    ldm_steps: 30,
    prompt: "",
    negative_prompt:
      "out of frame, lowres, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, disfigured, gross proportions, malformed limbs, watermark, signature",
    image,
    mask,
    p2p_image_guidance_scale: 1.5,
    powerpaint_task: "text-guided",
    sd_sampler: "DPM++ 2M",
  };

  const res = await fetch(`http://localhost:8080/api/v1/inpaint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request_data),
  });

  return await res.blob();
}
