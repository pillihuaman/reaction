import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { SupportService } from '../../../@data/services/support.service';
import { Const } from '../../../utils/const';

@Component({
  selector: 'app-imagen-catch-information',
  templateUrl: './imagen-catch-information.component.html',
  styleUrls: ['./imagen-catch-information.component.scss'],
})
export class ImagenCatchInformationComponent implements OnInit {
  constructor(private supportService: SupportService) {}

  @Input() image: any;
  urlApiImagen: String =
    `${Const.API_IMAGEN}` + `/v1/imagen/getImagen?codImagen=`;
  @Input() urlImagen?: any;
  ngOnInit(): void {
    ////debuger;
    if (this.image) {
      console.log(this.image);
      console.log(this.image.firstObject);

      console.log(this.image.attr);
    }
  }
  ngOnChanges(change: SimpleChange) {
    //console.log(change);
  }
  clickCount(event: any) {
    //console.log(event);
  }

  concateInput(str1: any, str2: any) {
    //console.log(str1.concat(str2));
    return str1.concat(str2);
  }
  dataget() {
    console.log(this.image);

    this.supportService.saveClickCountImagen(this.image).subscribe(
      (value) => {
        if (value) {
          console.log(JSON.stringify(value));
        }
      },
      (error) => {}
    );
  }
}
