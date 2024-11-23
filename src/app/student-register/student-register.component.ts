import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss'],
})
export class StudentRegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted = false;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  capturedImage: string | null = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      studentId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      institution: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });
  }

  // Getter for easy access to form controls
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Mark all controls as touched to trigger validation messages
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });

    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      alert('Registration successful!');
    } else {
      alert('Please correct the errors in the form.');
    }
  }

  // Start camera for capturing the user's image
  startCamera(): void {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = this.video.nativeElement;
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
        alert('Unable to access camera.');
      });
  }

  // Capture image from video stream
  captureImage(): void {
    const videoElement = this.video.nativeElement;
    const canvasElement = this.canvas.nativeElement;
    const context = canvasElement.getContext('2d');

    if (context) {
      context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      this.capturedImage = canvasElement.toDataURL('image/png');

      // Safely stop the video stream
      const stream = videoElement.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      videoElement.srcObject = null; // Clear the video element's stream
    }
  }
}
