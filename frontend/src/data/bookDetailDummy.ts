export interface BookPage {
  page: number;
  text: string;
  image: string;
}

export interface BookDetail {
  id: number;
  title: string;
  pages: BookPage[];
}

const shimcheongDetail: BookDetail = {
  id: 1,
  title: "심청전",
  pages: [
    {
      page: 1,
      text: "옛날 옛적에 심 봉사와 그의 딸 심청이가 살고 있었어요.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
    {
      page: 2,
      text: "심청이는 눈이 먼 아버지를 정성껏 모시며 살았어요.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
    {
      page: 3,
      text: "어느 날, 심 봉사는 절에서 공양미 삼백 석을 바치면 눈을 뜰 수 있다는 말을 들었어요.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
    {
      page: 4,
      text: "심청이는 아버지를 위해 인당수에 몸을 던지기로 결심했어요.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
    {
      page: 5,
      text: "심청이는 인당수에 빠졌지만, 용왕님의 궁궐로 들어가게 되었어요.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
    {
      page: 6,
      text: "용왕님은 심청이의 효심에 감동하여 그녀를 꽃으로 피워내어 다시 인간 세상으로 돌려보냈어요.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
    {
      page: 7,
      text: "심청이는 왕비가 되어 다시 아버지를 찾기 시작했어요.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
    {
      page: 8,
      text: "나라에서는 맹인을 위한 큰 잔치를 열었고, 그곳에 심 봉사도 초대되었어요.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
    {
      page: 9,
      text: "심청이는 잔치 자리에서 아버지를 만나 눈물을 흘렸어요.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
    {
      page: 10,
      text: "기적처럼 심 봉사의 눈이 떠졌고, 부녀는 다시 행복하게 살았답니다.",
      image:
        "https://mediafactory.play.kbs.co.kr/clip/2023/05/04/6453d78755670e925becc539/thumbnail/6453d78755670e925becc539_0_1683216454983.jpg",
    },
  ],
};

export default shimcheongDetail;
