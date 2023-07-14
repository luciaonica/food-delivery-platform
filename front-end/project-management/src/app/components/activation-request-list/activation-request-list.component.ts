import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivationRequest } from 'src/app/entities/ActivationRequest';
import { ActivationRequestService } from 'src/app/services/activation-request.service';

@Component({
  selector: 'app-activation-request-list',
  templateUrl: './activation-request-list.component.html',
  styleUrls: ['./activation-request-list.component.css']
})
export class ActivationRequestListComponent implements OnInit{

  activationRequests: ActivationRequest[] = [];
  modalRequestId: number | undefined;

  constructor(private activationRequestService: ActivationRequestService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadActivationRequests();
  }

  loadActivationRequests(): void {
    this.activationRequestService.getAllActivationRequests().subscribe(
      (requests: ActivationRequest[]) => {
        this.activationRequests = requests;
      },
      (error: any) => {
        console.error('Error retrieving activation requests:', error);
      }
    );
  }

  approve(id: number | undefined){
    const requestId = id ?? 0;
    this.activationRequestService.approveRequest(requestId).subscribe((response) => {
      console.log(response);
    });
    this.closeApproveModal();
    this.openConfirmModal();
  }

  openApproveModal(requestId: number) {
    this.modalRequestId = requestId;
    const modelDiv = document.getElementById('approveModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }   
  }

  closeApproveModal() {
    const modelDiv = document.getElementById('approveModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    }   
  }

  openConfirmModal(){
    const modelDiv = document.getElementById('confirmModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }  
  }

  closeConfirmModal() {
    const modelDiv = document.getElementById('confirmModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    }  
  }

  redirect() {
    this.closeConfirmModal();
    this.loadActivationRequests();
  }
}
