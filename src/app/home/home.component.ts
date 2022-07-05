import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewComponent } from 'src/app/modal-content/add-new/add-new.component';
import { ApiService } from '../services/api.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr'
import Swal from 'sweetalert2';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: any;
  bsModalRef: BsModalRef | undefined;
  searchText: any;
  isEditMode = false;
  itemSelected: any;


  public editProfileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    skills: new FormArray([
      new FormControl('',[Validators.required]),
      new FormControl('',[Validators.required]),
    ]),
    hobbies: new FormArray([
      new FormControl('',[Validators.required]), new FormControl('',[Validators.required]),

    ])
  });


  constructor(private modalService: NgbModal, private api: ApiService, public toastr: ToastrService, private fb: FormBuilder) { }


  ngOnInit() {
    this.api.getUser().subscribe(res => {
      this.users = res;
      console.log('data response', this.users);
    });

    this.api.createNewUserEvent.subscribe(data => {
      this.api.getUser().subscribe(res => {
        this.users = res;
        console.log("List", this.users);
      });
    });
  }

  openModal(targetModal: any, user: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
    console.log("user", user);

    this.itemSelected = user._id;
    console.log("patchvalue", this.editProfileForm);

    this.editProfileForm.patchValue({
      username: user.username,
      email: user.email,
      phone: user.phone,
      skills: user.skills,
      hobbies: user.hobbies,


      // hobby: (<FormArray>this.editProfileForm.get("hobby")?.value)
    });
  }

  addNew() {
    const modalRef = this.modalService.open(AddNewComponent, {
      centered: true,
      windowClass: 'prism-modal',
      backdropClass: 'prism-modal-backdrop',
      backdrop: 'static',
      size: 'md'
    });
  }

  async onSubmitEdit() {
    if(this.editProfileForm.invalid){
      this.toastr.warning("Please complete form")
    }else{
    const data = this.editProfileForm.getRawValue();
    console.log('data', data);
    
    const id = this.itemSelected;
    const update = await this.api.updateUser(data, id).toPromise();
    this.api.getUser().subscribe(res => {
      this.users = res;
      console.log('data response', this.users);
    });
    
    
    this.toastr.success('Successfully Edit');
    this.modalService.dismissAll();
  }
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.editProfileForm.get('hobbies')).push(control);
  }

  funcHobby() {
    return (this.editProfileForm.get('hobbies') as FormArray).controls;
  }

  deleteHobby(item: any) {
    console.log("item", item);
    console.log(this.editProfileForm.get('hobby'));
    (this.editProfileForm.get('hobbies') as FormArray).controls.splice(item, 1);
  }

  deleteMission(item: any) {
    Swal.fire({
      title: 'Confirm Delete?',
      text: 'Data will deleted permanently  ',
      icon: 'warning',

      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      // cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.api.deleteUser(item).subscribe(res => {

          this.toastr.error("Succesfully deleted User");
          this.api.getUser().subscribe(res => {
            this.users = res;
            console.log('data response', this.users);
          });

        });
        Swal.fire(
          'Deleted!',
          'Your User record has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your User  record is safe :)',
          'error'
        )
      }
    });

  }

  onAddSKill() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.editProfileForm.get('skills')).push(control);
  }

  deleteSkill(item: any) {
    // console.log("item", item);
    // console.log(this.SignupForm.get('skill'));
    (this.editProfileForm.get('skills') as FormArray).controls.splice(item, 1);
  }

  funcSkill() {
    return (this.editProfileForm.get('skills') as FormArray).controls;
  }

}
