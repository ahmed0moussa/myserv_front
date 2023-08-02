import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css']
})
export class CompteRenduComponent {
  ImageUrl: string | ArrayBuffer | null = null;
  selectedFileName: string | undefined;
  selectedcvName: string | undefined;
  captionText: string | undefined;
  @ViewChild('myModal') modalRef!: ElementRef;
 
  

  readURL(input: any): void {
    const file = input.files[0];

    if (!file) {
      this.ImageUrl = null;
      this.selectedFileName = '';
      return;
    }

    // Check if the file is an image (JPG or PNG)
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      alert('Please select a JPG or PNG image.');
      this.ImageUrl = null;
      this.selectedFileName = '';
      return;
    }

    // Check if the file size is less than or equal to 5 MB (5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should not exceed 5 MB.');
      this.ImageUrl = null;
      this.selectedFileName = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      this.ImageUrl = e.target?.result as string | ArrayBuffer | null;
    };

    reader.readAsDataURL(file);
    this.selectedFileName = file.name;
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.readURL(fileInput);
  }
  oncvSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedcvName = fileInput.files[0].name;
    } else {
      this.selectedcvName = '';
    }
  }
  

  openModal() {
    const modal = this.modalRef.nativeElement as HTMLElement;
    const img = document.getElementById('myImg') as HTMLImageElement;

    this.ImageUrl = img.src;
    this.captionText = img.alt;
    modal.style.display = 'block';
  }

  closeModal() {
    const modal = this.modalRef.nativeElement as HTMLElement;
    modal.style.display = 'none';
  }
}

