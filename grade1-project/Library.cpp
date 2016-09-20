//the implemetation of function
#include "Library.h"
#include <cstring>
#include <iostream>
#include <cstdio>
#include <iomanip>
// setf('0') in id
//if head == NULL this judg
//const char *(classic[26]) = {"马克思主义、列宁主义、毛泽东思想、邓小平理论","哲学、宗教",
//       "社会科学总论", "政治、法律",  "军事", "经济","文化、科学、教育、体育","语言、文字\n"
//       "文学", "艺术", "历史、地理","自然科学总论", "数理科学和化学", "天文学、地球科学",
//        "生物科学", "医药、卫生","农业科学", "工业技术","交通运输","航空、航天",
//        "环境科学、安全科学",  "综合性图书"};
using namespace std;
static book *(books[26]);
book* (head[26]);
book* (end[26]);
//static book books[100][100];
bool in() {//bookName
  string name;
  int t, num;
  cout << "Enter the book's name(within 100 words):  ";
  getline(cin, name);
  cout << "Enter the number of this book you add to library:  ";
  cin >> num;
  if (findBooksByBookName(name)) {
    cout << "Enter the book ID(0 to create a new book):  ";
    cin >> t;
    if (!t) {
      book &temp = findBookById(t);
      if (!add_book(temp, num)) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
    }
    //创建一个新书目
    else {
      class_choice();
      char choose;
      cin >> choose;
      book& temp = create_book(choose - 'A');
      if (!input_book_imformation(temp, choose - 'A')) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
      //book &temp = books[choose - 'A'][classcount[choose - 'A']];
      if (!add_book(temp, num)) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
    }
  }
//如果找不到，则创建一个新书目
  else {
      class_choice();
      char choose;
      cin >> choose;
      cin.get();
      book& temp = create_book(choose - 'A');
      if (!input_book_imformation(temp, choose - 'A')) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
      //book &temp = books[choose - 'A'][classcount[choose - 'A']];
      if (!add_book(temp, num)) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
  }
}

bool add_book(book &book1, int count) {
  book1.total += count;
  book1.onShelf += count;
  return true;
}
//input all imformation
bool input_book_imformation(book &book1, int cla) {
  string name;
  int num;
  int n1, n2, n3;
  cout << "Enter the book's name:  ";
  getline(cin, name);
  book1.bookName = name;
  cout << "Enter the author's name:  ";
  getline(cin, name);
  book1.author = name;
  cout << "Enter the name of the publish company:  ";
  getline(cin, name);
  book1.publishCompany = name;
  cout << "Enter the version:  ";
  cin >> num;
  book1.ver = num;
  cout << "Enter the publish time(year month day):  ";
  cin >> n1 >> n2 >> n3;
  cin.get();
  book1.Time.year = n1;
  book1.Time.month = n2;
  book1.Time.day = n3;
//  class_choice();
//  char choose;
//  cin >> choose;
//  cin.get();
  book1.classification = cla;
//ID后两位表示分类，前面八位表示数目
  book1.id = classcount[book1.classification]++ * 100 + book1.classification;
  numberOfAllBooks++;
}
//创建新书目
book& create_book(int cla) {
  book *newbook = new book;
  book *previousEnd = new book;
  previousEnd = end[cla];
  previousEnd->next = newbook;
  newbook->next = NULL;
  return *newbook;
}
//borrow
bool borrow_full() {
  string bookname;
  cout << "Enter the book name:  ";
  getline(cin, bookname);
  if (findBooksByBookName(bookname))
    borrow_simple();
}

bool borrow_simple() {
  int id;
  cout << "Enter the book ID:  ";
  //cin >> id;
  while (cin >> id) {
    cin.get();
    book& temp = findBookById(id);
    if (temp.onShelf) {
      off_shelf(temp);
      return true;
    }
    cout << "This books are all borrowed. Please enter another book ID: ";
  }
}
//return
bool Return() {
  int id;
  cout << "Enter the book ID:  ";
  cin >> id;
  cin.get();
  book& temp = findBookById(id);
  back_to_shelf(temp);
  return true;
}
bool off_shelf(book &book1) {
  book1.borrow++;
  book1.onShelf--;
  return true;
}

bool back_to_shelf(book &book1) {
  book1.borrow--;
  book1.onShelf++;
  return true;
}
//find()
bool find() {
  cout << "Choose the searching method:\n"
       << "a. Author name        b. Book name\n"
       << "c. Classification     d. Publish time\n";
  char choice;
  cin >> choice;
  cin.get();
  string name;
  if (choice == 'a') {
    cout << "Enter the author name:  ";
    getline(cin, name);
    if (findBooksByAuthor(name))
      return true;
    else {
      cout << "Can't find the book.\n";
      return false;
    }
  }
  if (choice == 'b') {
    cout << "Enter the book name:  ";
    getline(cin, name);
    if (findBooksByBookName(name))
      return true;
    else {
      cout << "Can't find the book.\n";
      return false;
    }
  }
  if (choice == 'c') {
    class_choice();
    char ch;
    cin >> ch;
    cin.get();
    if (findBooksByClassification(ch - 'A'))
      return true;
    else {
      cout << "Can't find the book.\n";
      return false;
    }
  }
  if (choice == 'd') {
    publishTime temp;
    cout << "Enter the publish time(year month day):  ";
    cin >> temp.year >> temp.month >> temp.day;
    if (findBooksByPublishTime(temp))
      return true;
    else {
      cout << "Can't find the book.\n";
      return false;
    }
  }
  return true;
}
//显示特定的书目
bool show_book(){
  int id;
  cout << "Enter the book id you want to know:  ";
  cin >> id;
  cin.get();
  standard_output(id %100, id /100);
  return true;
}
//显示所有书目
bool show_allbooks() {
  for (int i = 0 ; i < 26; i++) {
    for (int j = 0; j < classcount[i]; j++) {
      standard_output(i, j);
    }
  }
  return true;
}
//用作者名称来搜索书本
bool findBooksByAuthor(string authorName) {
  //遍历查找
  int count = 1;
  int sign = 1;//不能搜索到为1，搜索到为0
  for (int i = 0; i < 26; i++) {
    for (int j = 0; j < classcount[i]; j++) {
      if (authorName == books[i][j].author) {
        cout << "#" << count++ << endl;
        standard_output(i, j);
        sign = 0;
      }
    }
  }
  if (sign)
    return false;
  else
    return true;
}
//用书名来搜索书本
bool findBooksByBookName(string bookName) {
  //遍历查找
  int count = 1;
  int sign = 1;//搜索到为0， 未搜索到为1
  if (!numberOfAllBooks) {
    return false;
  }
  for (int i = 0; i < 26; i++) {
    for (int j = 0; j < classcount[i]; j++) {
      if (bookName == books[i][j].bookName) {
        cout << "#" << count++ << endl;
        standard_output(i, j);
        sign = 0;
      }
    }
  }
  if (sign)
    return false;
  else
    return true;
}
//用分类来查找
bool findBooksByClassification(int cla) {
  //如果该分类中没有书籍，则返回false
  if (!classcount[cla])
    return false;
  int count = 1;
  for (int i = 0; i < classcount[cla]; i++) {
    cout << "#" << count++ << endl;
    standard_output(cla, i);
  }
  return true;
}
//用出版时间来查找
bool findBooksByPublishTime(publishTime time) {
  int count = 1;
  int sign = 1;
  for (int i = 0; i < 26; i++) {
    for (int j = 0 ; j < classcount[i]; i++) {
      if (time.year == books[i][j].Time.year
           && time.month == books[i][j].Time.month
           && time.day == books[i][j].Time.day) {
             cout << "#" << count++ << endl;
             standard_output(i, j);
           }
    }
  }
  if (sign)
    return false;
  else
    return true;
}
void standard_output(int i, int j) {
  cout << "  ID: " << books[i][j].id << endl;
  cout << "  Bookname: " << books[i][j].bookName << endl;
  cout << "  Author name: " << books[i][j].author << endl;
  cout << "  Publish company:  " << books[i][j].publishCompany << endl;
  cout << "  Version: " << books[i][j].ver << endl;
  cout << "  Classification:  " << books[i][j].classification << endl;
  cout << "  Publish time: " << books[i][j].Time.year << "y " << books[i][j].Time.month
       << "m " << books[i][j].Time.day<< "d \n";
  cout << "  Borrow: " << setw(5) << books[i][j].borrow
       << "\tOn shelf: " << books[i][j].onShelf<<endl;
}


void main_choice() {
  cout << "a. Store book                 b. Borrow book\n"
       << "c. Return book                d. Search book\n"
       << "e. show details of a book     f. show all books\n"
       << "g. quit\n";
  cout << "Enter your choice:  ";
}

void find_choice() {
  cout << "a. By author name      b. By book name\n"
       << "c. By classification   d. By publish time\n";
  cout << "Enter your choice:  ";
}

void class_choice() {
  cout <<"Choose the book's classification: \n"
       << "A: 马克思主义、列宁主义、毛泽东思想、邓小平理论\n"
       << "B: 哲学、宗教\n"
       << "C: 社会科学总论\n"
       << "D: 政治、法律\n"
       << "E: 军事\n"
       << "F: 经济\n"
       << "G: 文化、科学、教育、体育\n"
       << "H: 语言、文字\n"
       << "I: 文学\n"
       << "J: 艺术\n"
       << "K: 历史、地理\n"
       << "N: 自然科学总论\n"
       << "O: 数理科学和化学\n"
       << "P: 天文学、地球科学\n"
       << "Q: 生物科学\n"
       << "R: 医药、卫生\n"
       << "S: 农业科学\n"
       << "T: 工业技术\n"
       << "U: 交通运输\n"
       << "V: 航空、航天\n"
       << "X: 环境科学、安全科学\n"
       << "Z: 综合性图书\n";
}
book &findBookById(int id) {
  book *current, * prev;
  int clas = id % 100;
  current = new book, prev = new book;
  current = head[clas];
  int num = id / 100;
  for (int i = 0; i < num; i++) {
    prev = current;
    current = current->next;
  }
  return *current;
}
