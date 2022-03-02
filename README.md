# ERP-web-service
React, Redux, Bootstrap, Express, MySQL(sequelize)을 활용한 토이 프로젝트입니다.
<br/><br/><br/>

### page #1 재고관리
재고 리스트를 보여줍니다.
테이블은 React Data Table을 이용하였습니다.
https://react-data-table-component.netlify.app/?path=/story/getting-started-intro--page
![image](https://user-images.githubusercontent.com/76773202/156268732-c41ef9ee-e6ea-4d9a-b998-0a3b39ca4d01.png)

<br/><br/><br/>

### page #1-1 재고관리 - 제품 생성 / 삭제
새로운 제품 종류를 추가/삭제합니다.
제품 코드는 체크 시 자동으로 생성됩니다.
카테고리 선택 등 선택지가 테이블 매핑으로 정해져 있는 경우, typeahead 라이브러리로 autocomplete를 구현하였습니다.
https://github.com/ericgio/react-bootstrap-typeahead
![image](https://user-images.githubusercontent.com/76773202/156269043-4dc757e0-c673-40be-be6a-06a0a2e66f8f.png)

<br/><br/><br/>

### page #2 입출고기록
입고/출고를 모두 기록합니다.

![image](https://user-images.githubusercontent.com/76773202/156269363-a3c20d19-a1e7-4185-8629-a4c51d8fca51.png)


### page #3 입고 / 출고
입고/출고를 진행합니다.
제품명, 거래처는 데이터베이스에서 list를 불러와서 autocomplete로 구현되어 있습니다.
react-datetime (캘린더)
https://github.com/arqex/react-datetime
![image](https://user-images.githubusercontent.com/76773202/156269546-8da220ca-27fd-49d9-877c-5de6a5f447e8.png)

### page4 거래처 관리
거래처를 추가하거나 삭제합니다.
거래 형태를 구매/판매로 구분합니다.
![image](https://user-images.githubusercontent.com/76773202/156269779-b849fe50-87de-4e7c-92ed-0e907db835db.png)

