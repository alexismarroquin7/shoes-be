const images = [
  { // 1
    image_name: "nike--zoom-alphafly-next-nature--multi-color--right-shoe--left-view",
    image_title: "nike--zoom-alphafly-next-nature--multi-color--right-shoe--left-view",
    image_alt: "nike--zoom-alphafly-next-nature--multi-color--right-shoe--left-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/04993055-6221-4a74-8ff2-bd37b481c057/zoom-alphafly-next-nature-road-racing-shoes-WnMHmS.png",
  },
  { // 2
    image_name: "nike--zoom-alphafly-next-nature--multi-color--both-shoes--top-view",
    image_title: "nike--zoom-alphafly-next-nature--multi-color--both-shoes--top-view",
    image_alt: "nike--zoom-alphafly-next-nature--multi-color--both-shoes--top-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/8f7b5836-27ec-4248-aea0-688d9652aaca/zoom-alphafly-next-nature-road-racing-shoes-WnMHmS.png",
  },
  { // 3
    image_name: "nike--zoom-alphafly-next-nature--multi-color--right-shoe--right-view",
    image_title: "nike--zoom-alphafly-next-nature--multi-color--right-shoe--right-view",
    image_alt: "nike--zoom-alphafly-next-nature--multi-color--right-shoe--right-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/92b73dd3-1810-43f6-8552-9553526825b4/zoom-alphafly-next-nature-road-racing-shoes-WnMHmS.png",
  },
  { // 4
    image_name: "nike--zoom-alphafly-next-nature--multi-color--both-shoes--3/4-view",
    image_title: "nike--zoom-alphafly-next-nature--multi-color--both-shoes--3/4-view",
    image_alt: "nike--zoom-alphafly-next-nature--multi-color--both-shoes--3/4-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d2667e1c-3585-45b9-a979-47485280b90e/zoom-alphafly-next-nature-road-racing-shoes-WnMHmS.png",
  },
  
  //
  { // 5
    image_name: "nike--sb-chron-2-slip--white--left-shoe--left-view",
    image_title: "nike--sb-chron-2-slip--white--left-shoe--left-view",
    image_alt: "nike--sb-chron-2-slip--white--right-shoe--left-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/6a414520-b07b-491a-8dbe-69669f033084/sb-chron-2-slip-skate-shoes-qxwqcz.png",
  },
  { // 6
    image_name: "nike--sb-chron-2-slip--white--both-shoes--top-view",
    image_title: "nike--sb-chron-2-slip--white--both-shoes--top-view",
    image_alt: "nike--sb-chron-2-slip--white--both-shoes--top-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/46d64dae-d125-4372-9c34-9f64baaeb81e/sb-chron-2-slip-skate-shoes-qxwqcz.png",
  },
  { // 7
    image_name: "nike--sb-chron-2-slip--white--left-shoe--right-view",
    image_title: "nike--sb-chron-2-slip--white--left-shoe--right-view",
    image_alt: "nike--sb-chron-2-slip--white--left-shoe--right-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d39d6fe5-8f8b-41cc-b0b6-24f2fce7b716/sb-chron-2-slip-skate-shoes-qxwqcz.png",
  },
  { // 8
    image_name: "nike--sb-chron-2-slip--white--both-shoes--3/4-view",
    image_title: "nike--sb-chron-2-slip--white--both-shoes--3/4-view",
    image_alt: "nike--sb-chron-2-slip--white--both-shoes--3/4-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/49b5b5f1-56f5-4537-8d01-0c9363f695f5/sb-chron-2-slip-skate-shoes-qxwqcz.png",
  },

  //
  { // 9
    image_name: "nike--sb-chron-2-slip--black--left-shoe--left-view",
    image_title: "nike--sb-chron-2-slip--black--left-shoe--left-view",
    image_alt: "nike--sb-chron-2-slip--black--right-shoe--left-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/6ae5ecd6-04eb-47a5-9cc0-b87835f7a292/sb-chron-2-slip-skate-shoes-qxwqcz.png",
  },
  { // 10
    image_name: "nike--sb-chron-2-slip--black--both-shoes--top-view",
    image_title: "nike--sb-chron-2-slip--black--both-shoes--top-view",
    image_alt: "nike--sb-chron-2-slip--black--both-shoes--top-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/59e5b262-5d38-4238-8660-b67edb90e1d2/sb-chron-2-slip-skate-shoes-qxwqcz.png",
  },
  { // 11
    image_name: "nike--sb-chron-2-slip--black--right-shoe--right-view",
    image_title: "nike--sb-chron-2-slip--black--right-shoe--right-view",
    image_alt: "nike--sb-chron-2-slip--black--right-shoe--right-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/8379f439-d429-4ad6-85f8-e54d04de4dde/sb-chron-2-slip-skate-shoes-qxwqcz.png",
  },
  { // 12
    image_name: "nike--sb-chron-2-slip--black--both-shoes--3/4-view",
    image_title: "nike--sb-chron-2-slip--black--both-shoes--3/4-view",
    image_alt: "nike--sb-chron-2-slip--black--both-shoes--3/4-view",
    image_src: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2f78ef43-afba-462a-851e-6fbd666cfb72/sb-chron-2-slip-skate-shoes-qxwqcz.png",
  },


];

module.exports=images;