# API 명세서


# Base URL
https://sheltered-coast-03694.herokuapp.com/

>  # /images

클라이언트에서 이미지 전송  
이미지 처리 후 닮은 꼴 연예인 사진과 결과값 반환  

일일 최대 요청 횟수 : 1000회

## Request

**method** : POST  
**headers** : {
  Contnet-Type : multipart/form-data
}

**body** (form-data)
```
 // 이미지 데이터를 form-data 형식으로 전송
 // 파일 크기는 2Mb 제한
  {
    "image" : image data
  }
```


## Response

```

{ // status 200
	"message" : "success",
	"data" : {
		"image" : "https://search.pstatic.net/common/?src=http://imgnews.naver.net/image/420/2018/06/27/101916877_4.jpg&type=b150",
		"value" : "서강준",
		"accuracy" : 0.31113
	}
}

{ // status 409
	"message":"file size too big",
	"data" : null
}

{ // status 500
	"message": "server err",
	"data" : null
}
```
