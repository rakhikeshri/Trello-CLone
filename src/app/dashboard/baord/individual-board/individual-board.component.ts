import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BoardsService } from 'src/app/service/boards.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-individual-board',
  templateUrl: './individual-board.component.html',
  styleUrls: ['./individual-board.component.css'],
})
export class IndividualBoardComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private boards: BoardsService,
    private users: UserProfileService,
    private builder: FormBuilder,
    public userProfile: UserProfileService
  ) {}

  // ... menu

  isDropdownMenuOpened: boolean = false;
  toggleDropdownMenu() {
    this.isDropdownMenuOpened = !this.isDropdownMenuOpened;
  }

  clickedOutside() {
    this.isDropdownMenuOpened = false;
  }
  // ... menu

  showCodes = true;
  toggleCode() {
    this.showCodes = !this.showCodes;
  }

  showImg = false;
  toggleCodeImg() {
    this.showImg = !this.showImg;
  }

  showColr = false;
  toggleCodeColr() {
    this.showColr = !this.showColr;
  }

  listsData: any[] = [];
  cardsItemData: any[] = [];
  checklistsData: any[] = [];
  usersData: any;
  card: any;
  newCardData: any;
  isStarred: boolean = false;
  current_board_id: any;
  current_board_title: string = '';
  current_board_desc: string = '';
  current_board_users: number[] = [];
  current_board_admins: number[] = [];
  current_board_viewers: number[] = [];
  current_board_editors: number[] = [];
  current_board_starredByUserId: number[] = [];
  invitedUser: any = null;
  invitationError: string = '';
  current_list_id: number | null = null;
  text_editor_content = '';
  comment = '';
  comment_obj = {};
  current_user_id: number | null = null;
  checklistTitle: String = '';

  filterCards(listId: any) {
    const cards = this.cardsItemData.filter(
      (card: any) => card.list_id === listId
    );
    return cards;
  }

  onCardDrop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  sendInvite(userId: number, accessType: string, input_search: any) {
    let updatedRoleData = {};
    this.invitedUser = null;

    input_search.value = '';
    if (!this.current_board_users.includes(userId)) {
      this.current_board_users.push(userId);
      if (accessType === 'admin') {
        this.current_board_admins.push(userId);
        updatedRoleData = { admins: this.current_board_admins };
      } else if (accessType === 'editor') {
        this.current_board_editors.push(userId);
        updatedRoleData = { editors: this.current_board_editors };
      } else {
        this.current_board_viewers.push(userId);
        updatedRoleData = { viewers: this.current_board_viewers };
      }
      const updatedUsersData = { users: this.current_board_users };

      this.boards
        .updateUsers(this.current_board_id, updatedUsersData)
        .subscribe((res) => {
          if (res) {
            console.log('User invited successfully to this board!');
            alert('User invited successfully to this board!');
          }
        });

      this.boards
        .updateUserAccessType(this.current_board_id, updatedRoleData)
        .subscribe((res) => {
          if (res) {
            console.log(`User access type set to ${accessType}`);
          }
        });

      this.userProfile.getUserById(userId).subscribe((res) => {
        if (res) this.members.push(res);
      });
    } else {
      alert('User already added');
    }
  }

  searchUsers(formValue: any, input_search: any) {
    const inviteeEmail = formValue.email;
    let userNotFound = true;
    this.invitationError = '';
    this.usersData.forEach((user: any) => {
      if (user.email === inviteeEmail) {
        this.invitedUser = user;
        userNotFound = false;
      }
    });

    if (userNotFound) this.invitationError = 'No matches found in DB!';
    input_search.value = '';
  }

  member_modal_close() {
    this.invitedUser = null;
    this.invitationError = '';
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.current_board_id = params.get('id') || ''; // Update current_board_id whenever the URL changes
      this.loadBoardData(); // Call the function to load data based on the new board ID
      this.loadListsData();
    });

    //getting userId for showing individual user's comments starts here
    this.current_user_id = Number(localStorage.getItem('userId'));

    this.boards.getUserById(this.current_user_id).subscribe((res) => {
      this.comment_obj = {
        userId: this.current_user_id,
        email: (res as any).email,
        comment: '',
      };
    });

    //getting userId for showing individual user's comments ends here

    this.users.getAllUsers().subscribe((res: any) => {
      if (res) {
        this.usersData = res;
      } else {
        this.invitationError = 'Could not fetch users from DB!';
      }
    });

    //getting checklists Data for showing checklists inside description model
    this.boards.getAllChecklists().subscribe((res: any) => {
      this.checklistsData = res;
    });

    this.showMembers();
  }

  // showing members in the side bar starts here

  members_id: any[] = [];
  members: any[] = [];
  showMembers() {
    this.boards.getBoardById(this.current_board_id).subscribe((res: any) => {
      res.users.forEach((userId: number) => {
        this.userProfile.getUserById(userId).subscribe((res) => {
          if (res) this.members.push(res);
        });
      });
    });
  }

  loadBoardData(): void {
    this.boards.getBoardById(this.current_board_id).subscribe((res: any) => {
      if (res) {
        if (res.starredByUserId.includes(this.current_user_id))
          this.isStarred = true;
        this.current_board_title = res.title;
        this.current_board_desc = res.description;
        this.current_board_users = res.users;
        this.current_board_admins = res.admins;
        this.current_board_editors = res.editors;
        this.current_board_viewers = res.viewers;
        this.current_board_starredByUserId = res.starredByUserId;
      } else {
        this.invitationError = 'Server Error! Could not process request!';
      }
    });
  }

  loadListsData() {
    this.boards.getAllLists().subscribe((allLists: any) => {
      this.listsData = allLists.filter((list: any) => {
        return list.board_id === this.current_board_id;
      });

      this.boards.getAllCardsItem().subscribe((allCardsItem: any) => {
        this.cardsItemData = allCardsItem;

        this.listsData = this.listsData.map((list: any) => {
          const cards = this.cardsItemData.filter((card: any) => {
            return list.id === card.list_id;
          });
          return { ...list, cards };
        });
      });
    });
  }

  // formatDate(date: string): string {
  //   const options: Intl.DateTimeFormatOptions = {
  //     weekday: 'long',
  //     day: 'numeric',
  //     month: 'long',
  //   };
  //   return new Date(date).toLocaleDateString(undefined, options);
  // }

  formatDate(date: string): string {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const yearToDisplay = new Date(date).getFullYear();

    if (yearToDisplay === currentYear) {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      };
      const formattedDate = new Date(date).toLocaleDateString(undefined, options);
      const parts = formattedDate.split(', ');
      return `${parts[0]}, ${parts[1]}`;
    } else {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  }

  //adding and showing individual lists starts here
  addLists = this.builder.group({
    title: this.builder.control(''),
    board_id: '',
    date: new Date(Date.now()).toDateString(),
  });

  saveLists() {
    if (this.addLists.controls.title.value != '') {
      const formData = {
        ...this.addLists.value,
        board_id: this.current_board_id,
      };

      console.log(formData);

      this.boards.saveListsData(formData).subscribe((result) => {
        if (result) {
          this.listsData.push({ ...result, cards: [] });
          this.addLists.get('title')?.setValue('');
        }
      });
    } else {
      alert('Please enter the list title.');
    }
  }

  autoFillInput(inputRef: HTMLInputElement, valueTofill: any) {
    inputRef.value = valueTofill;
    
    // Manually trigger the input event to update the UI
    const inputEvent = new Event('input', { bubbles: true });
    inputRef.dispatchEvent(inputEvent);
  }

  updatedListTitle: string = '';
  updateListTitle(list_id: number, list: any) {
    const updatedList = {
      ...list,
      title: this.updatedListTitle,
      date: new Date(Date.now()).toDateString(),
    };

    this.boards.updateListTitle(list_id, updatedList).subscribe((result) => {
      if (result) {
        const currListIdx = this.listsData.findIndex(
          (list) => list.id === list_id
        );

        this.listsData[currListIdx].title = updatedList.title;
        this.listsData[currListIdx].date = updatedList.date;

        this.updatedListTitle = '';
      }
    });
  }

  //adding and showing individual list's card starts here

  activeListId(list_id: number, card_id: number) {
    this.comment = '';
    this.current_list_id = list_id;

    const card = this.cardsItemData.filter((card) => card.id === card_id);
    this.text_editor_content = card[0].desc;
  }

  updateCurrentListId(list_id: number) {
    this.current_list_id = list_id;
  }

  addCardsItem = this.builder.group({
    title: this.builder.control(''),
    desc: this.builder.control(''),
    members: this.builder.array([]),
    labels: this.builder.array([]),
    checklist: this.builder.array([]),
    comments: this.builder.array([]),
    list_id: this.current_list_id,
  });

  saveCardsItem() {
    console.log(this.listsData);
    if (this.addCardsItem.controls.title.value != '') {
      const formData = {
        ...this.addCardsItem.value,
        list_id: this.current_list_id,
        desc: this.text_editor_content,
      };

      this.boards.saveCardsItemData(formData).subscribe((result) => {
        if (result) {
          const idxToChange = this.listsData.findIndex((list: any) => {
            return list.id === this.current_list_id;
          });
          this.listsData[idxToChange].cards.push(result);
          this.cardsItemData.push(result);
          this.addCardsItem.get('title')?.setValue('');
        }
      });
    } else {
      alert('Please enter the card title.');
    }
  }

  currCardIdNo: number = -1;
  currCardId(card_id: number, list_id: number) {
    this.currCardIdNo = card_id;
    this.current_list_id = list_id;
  }
  updatedCardTitle: string = '';
  updateCardTitle() {
    const currCardToUpdate = this.listsData
      .map((list) =>
        list.cards.find((card: any) => card.id === this.currCardIdNo)
      )
      .filter((matchingCard) => matchingCard !== undefined);

    const updatedCard = {
      ...currCardToUpdate[0],
      title: this.updatedCardTitle,
    };
    this.boards
      .updateCardTitle(this.currCardIdNo, updatedCard)
      .subscribe((result) => {
        if (result) {
          console.log(this.listsData);

          const currList = this.listsData.filter(
            (list) => list.id === this.current_list_id
          );
          console.log('curCard', currList);
          const currCard = currList[0].cards.filter(
            (card: any) => card.id === this.currCardIdNo
          );

          currCard[0].title = this.updatedCardTitle;

          console.log('curcardtitle', currCard[0].title);

          this.updatedCardTitle = '';
        }
      });
  }

  //adding and showing checklist starts here

  addChecklists = this.builder.group({
    title: this.builder.control(''),
    card_id: this.current_list_id,
  });

  saveChecklistsData(card_id: number) {
    if (this.checklistTitle != '') {
      const formData = {
        title: this.checklistTitle,
        card_id: card_id,
        isChecked: false,
      };

      this.boards.saveChecklistsData(formData).subscribe((result) => {
        if (result) {
          this.checklistTitle = '';
          this.checklistsData.push(result);
        }
      });
    } else {
      alert('Please enter the checklist title');
    }
  }

  getChecklistLength(cardId: number): number {
    return this.checklistsData.filter(
      (checklist) => checklist.card_id === cardId
    ).length;
  }

  getChecked_ChecklistLength(cardId: number): number {
    return this.checklistsData
      .filter((checklist) => checklist.card_id === cardId)
      .filter((checked) => checked.isChecked === true).length;
  }

  cards: any[] = [];
  checklist: any[] = [];
  toggleCheckbox(checklist_id: number, card_id: number) {
    this.boards.getChecklistById(checklist_id).subscribe((res) => {
      (res as any).isChecked = !(res as any).isChecked;
      this.boards.toggleChecklist(checklist_id, res).subscribe((res) => {
        this.cards = this.checklistsData.filter(
          (checklist) => checklist.card_id === card_id
        );
        this.checklist = this.cards.filter(
          (checklist) => checklist.id === checklist_id
        );

        this.checklist[0].isChecked = !this.checklist[0].isChecked;
      });
    });
  }

  //adding and showing description starts here
  saveCardsDesc(card_id: any) {
    this.card = this.cardsItemData.filter((card) => card.id == card_id);
    this.card[0].desc = this.text_editor_content;

    this.boards
      .addCardDescByCardId(card_id, this.card[0])
      .subscribe((result) => {
        if (result) {
          // this.text_editor_content = '';
        }
      });
  }

  saveCardsComment(card_id: any) {
    this.card = this.cardsItemData.filter((card) => card.id == card_id);

    if (this.comment != '') {
      const commentData = {
        ...this.comment_obj,
        comment: this.comment,
      };

      this.card[0].comments.push(commentData);

      this.boards
        .addCardDescByCardId(card_id, this.card[0])
        .subscribe((result) => {
          if (result) {
            this.comment = '';
          }
        });
    }
  }

  //code for changing background color starts here

  title = 'Angular Multiple Theme Switcher';
  // storedTheme: string = localStorage.getItem('theme-color');
  storedTheme: string = localStorage.getItem('theme-color') ?? 'default-theme';
  setTheme(theme: string) {
    localStorage.setItem('theme-color', theme);
    // this.storedTheme = localStorage.getItem('theme-color');
    this.storedTheme = localStorage.getItem('theme-color') ?? 'default-theme';
  }
  //code for changing background color ends here

  //code for starred starts here
  notStarred() {
    if (this.current_user_id) {
      this.isStarred = true;
      this.current_board_starredByUserId.push(this.current_user_id);
      const data = { starredByUserId: this.current_board_starredByUserId };
      this.boards.updateStarredByUsers(this.current_board_id, data).subscribe();
    }
  }
  starred() {
    if (this.current_user_id) {
      this.isStarred = false;
      const idx = this.current_board_starredByUserId.indexOf(
        this.current_user_id
      );
      this.current_board_starredByUserId.splice(idx, 1);
      const data = { starredByUserId: this.current_board_starredByUserId };
      this.boards.updateStarredByUsers(this.current_board_id, data).subscribe();
    }
  }
  //code for starred ends here

  // board sidebar code starts here
  toggle_Sidebar: boolean = false;
  close_sidebar_logo = '<';
  open_sidebar_logo = '>';

  showSidebar() {
    this.toggle_Sidebar = true;
  }
  hideSidebar() {
    this.toggle_Sidebar = false;
  }
  // board sidebar code ends here

  // text-editor code starts here
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };
  // text-editor code starts here

  deleteCard(card_id: any) {
    console.log(card_id);
    this.boards.deleteCard(card_id).subscribe((result) => {
      this.ngOnInit();
      console.log(result);
    });
  }

  // deleteCard(cardId: any) {
  //   console.log(cardId);
  //   this.boards.deleteCard(cardId).subscribe((result) => {
  //     this.ngOnInit();
  //     console.log(result);
  //   });
  // }
}
