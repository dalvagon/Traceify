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
    const margin = 20;
    const width = canvas.width - margin * 2;
    const height = canvas.height - margin * 2 - 15;
    const xoff = 10;

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#001A28';
      for (let x = margin; x <= width; x += xoff) {
        const digit = Math.floor(Math.random() * 10);
        const y = x == margin || x == xoff + margin || x + xoff >= width ? height + Math.floor(Math.random() * 10) : height - 15;
        const lineWidth = (Math.floor(Math.random() * xoff * 0.5)) ^ 2 + 2;

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
