# AP and EP calculation

## Requirement

Feature: การคำนวณค่าตอบแทน AP (Availability Payment) และ EP (Energy Payment)

1. วันธรรมดามีการคิดค่า AP และ EP ส่วนวันหยุดของ กฟผ. ไม่คิด
2. คิดเฉพาะ On-Peak เท่านั้น
3. ต้องเป็นเครื่องชาร์จที่ Online อยู่
4. คิดเมื่อมีการเสียบสายชาร์จอยู่เท่านั้น
5. ต้องทำการเข้าร่วม (Join) ระบบ V2G
6. จะคิดเมื่อตอนเริ่ม Join ต้องมี Battery เหลือเกิน 20%
7. การ Discharge จะทำเมื่อ Battery มากกว่า 10%
8. จะคิดค่า EP เมื่อ มีการ Discharge เท่านั้น
9. อัตราการคิดค่า AP
   9.1 ชั่วโมงที่ 1: 4.00 บาท
   9.2 ชั่วโมงที่ 2: 4.00 บาท
   9.3 ชั่วโมงที่ 3 ขึ้นไป: 16.00 บาท
10. อัตราการคิดค่า EP
    10.1 5 บาท/kWh

## Reference

[Requirement + Test Case + Test Scenarios](https://docs.google.com/spreadsheets/d/1yLUXwtjR03IFgfrHptFLz5T3Gk5daNXzQ_8HCLkkuVw/edit?usp=sharing)
