1、迷宫优化前60，优化后58
2、打地鼠优化前139，优化后114
3、拼图优化前161，优化后117（增加了随机选择拼图图片的功能）

Toolkits使用心得：
1、一开始不熟悉jquery和lodash的API，所以思考了很久。但是熟悉后，利用jquery的各种函数，或者直接用css选择器获取DOM对象都非常方便，因此写js的效率大大提高。
2、这次优化了拼图、迷宫以及打地鼠的代码，用jquery做下来感觉比之前的思路更清晰，能够做到函数分离、各司其职的效果。
3、一开始改写的时候，很多函数没有用bind绑定作用域，导致多个函数的this对象直接指向window或其他DOM对象。以后需要注意一下。
4、虽然说jquery等类库使用很方便，但感觉jquery和lodash的某些函数可以直接用原生js实现，也不会增加多少代码，但运行速度就会快一点。jquery的优势是非常容易理解，代码精简。因此我认为真正工程项目中还需平衡一下两者的利弊。

可排序的网站：
1、Sicily	soj.sysu.edu.cn
2、北大oj	http://poj.openjudge.cn/
3、清华oj	http://dsa.cs.tsinghua.edu.cn/oj/
4、上交oj	https://acm.sjtu.edu.cn/OnlineJudge/contests


一行神秘代码在该文件夹下的mystery code

