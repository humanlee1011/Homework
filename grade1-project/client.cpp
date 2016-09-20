//client.cpp
//main function
#include "Library.h"
#include <iostream>
#include <string>
#include <iomanip>

int main() {
  char choice;
  cout << "This is a library management system, now you have 4 choices to do:\n";
  main_choice();
  while (cin >> choice && choice != 'q' && choice != 'g') {
    cin.get();
    if (choice == 'a' || choice == 'A') {
      if (!in()) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
    }
    if (choice == 'b' || choice == 'B') {
      if(!borrow_full()) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
    }
    if (choice == 'c'|| choice == 'C') {
      if (!Return()) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
    }
    if (choice == 'd' || choice == 'D') {
      if(find()) {
        cout << "Borrow or not(Y/N): ";
        char choi;
        cin >> choi;
        if (choi == 'Y' || choi == 'y') {
          if (!borrow_simple()) {
            cout << "Error.\n";
            exit(EXIT_FAILURE);
          }
        }
      }
    }
    if (choice == 'e'|| choice == 'E') {
      if (!show_book()) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
    }
    if (choice == 'f' || choice == 'F') {
      if (!show_allbooks()) {
        cout << "Error.\n";
        exit(EXIT_FAILURE);
      }
    }
    main_choice();
  }
  cout << "Bye.\n";

  return 0;
}

