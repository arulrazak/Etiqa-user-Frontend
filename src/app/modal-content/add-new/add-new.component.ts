import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  public SignupForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    skills: new FormArray([],[Validators.required]),
    hobbies: new FormArray([],[Validators.required])
  });

  constructor(private aModalService: NgbActiveModal, private formBuilder: FormBuilder, private api: ApiService,public Toastr:ToastrService) { }

 
  ngOnInit(): void {
    //  console.log("hellp", this.users);
  }

  func_hobby() {
    return (this.SignupForm.get('hobbies') as FormArray).controls;
  }

  func_skill() {
    return (this.SignupForm.get('skills') as FormArray).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.SignupForm.get('hobbies')).push(control);
  }

  onAddSKill() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.SignupForm.get('skills')).push(control);
  }

  deleteHobby(item: any) {
    console.log("item", item);
    console.log(this.SignupForm.get('hobbies'));
    (this.SignupForm.get('hobbies') as FormArray).controls.splice(item, 1);
  }

  deleteSkill(item: any) {
    console.log("item", item);
    console.log(this.SignupForm.get('skills'));
    (this.SignupForm.get('skills') as FormArray).controls.splice(item, 1);
  }

  closeModal() {
    // this.toastr.info('Close!Modal');
    this.aModalService.close();

  }

  async onSubmitForm() {
    if(this.SignupForm.invalid){
      this.Toastr.error("Please complete the form")
    }else{
    const data = this.SignupForm.getRawValue();
    console.log("data before submit", data);

    const update = await this.api.createUser(data).toPromise();
    // this.api.createUser(data).subscribe((result) => {
    //   console.warn(result);
      
    // }
    // )
    // // console.log("update", update);
    this.api.createNewUserEvent.emit();
    Swal.fire(
      '',
      'User Data Added',
      'success'
    );   
     this.aModalService.close();

    
    // this.api.createUser(data).subscribe(() => {
    // 
    // });
    }
  }
  triggerEvent(item: string) {
   
  }

}
