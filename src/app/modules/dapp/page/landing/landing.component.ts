import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.resize();
    this.draw();
  }

  draw() {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener(
        'resize',
        () => {
          this.resize();
        },
        false
      );
    });
  }

  resize() {
    const parent = this.canvasRef.nativeElement.parentElement;

    if (parent) {
      this.canvasRef.nativeElement.setAttribute('width', parent?.clientWidth.toString());
      this.canvasRef.nativeElement.setAttribute('height', parent?.clientHeight.toString());

      this.render();
    }
  }

  render() {
    // requestAnimationFrame(() => {
    //   setTimeout(() => {
    //     this.render();
    //   }, 1000)
    // });

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const xoff = 10;

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#E1FF17';
      ctx.strokeStyle = '#E1FF17';
      for (let x = 0; x <= width; x += xoff) {
        const digit = Math.floor(Math.random() * 10);
        const y = x == 0 || x == xoff || x + xoff >= width ? 2 * height / 3 + Math.floor(Math.random() * 10) : 3 * height / 5;
        const lineWidth = Math.pow(Math.random(), 2) * xoff * 0.5 + 1;

        ctx.beginPath();
        ctx.font = "10px bold Rubik";
        ctx.fillText(digit.toString(), x, 10);
        ctx.moveTo(x, 15);
        ctx.lineTo(x, y + 15);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    }
  }

  goTo(url: string) {
    window.open(url, '_blank');
  }
}
