import {Component} from '@angular/core';
import {ConfigService} from './config.service';


@Component({
  selector: 'my-controls',
  template: `
    <form>
      <div class="fieldset">
        <b>Rotation</b>
        <div class="fieldset-content">
          <label>
            Auto:
            <input type="checkbox"
                [checked]="config.autoRotate"
                (change)="config.autoRotate = $event.target.checked" />
          </label>
          <ng-container [ngSwitch]="config.autoRotate">
            <ng-container *ngSwitchCase="true">
              <label>
                Rand.
                <input type="radio" name="mode" value="random"
                    [checked]="config.autoRotateMode === 'random'"
                    (change)="$event.target.checked && config.autoRotateMode = $event.target.value" />
              </label>
              <label>
                Diag.
                <input type="radio" name="mode" value="diagonal"
                    [checked]="config.autoRotateMode === 'diagonal'"
                    (change)="$event.target.checked && config.autoRotateMode = $event.target.value" />
              </label>
            </ng-container>
            <ng-container *ngSwitchDefault>
              <label>
                X(&deg;):
                <input type="number"
                    [value]="radToDeg(config.rotation.x)"
                    (input)="config.rotation.x = degToRad($event.target.value)" />
              </label>
              <label>
                Y(&deg;):
                <input type="number"
                    [value]="radToDeg(config.rotation.y)"
                    (input)="config.rotation.y = degToRad($event.target.value)" />
              </label>
              <label>
                Z(&deg;):
                <input type="number"
                    [value]="radToDeg(config.rotation.z)"
                    (input)="config.rotation.z = degToRad($event.target.value)" />
              </label>
            </ng-container>
          </ng-container>
        </div>
      </div>
      <div class="fieldset">
        <div class="fieldset-content">
          <b>Stereo:</b>
          <label>
            on
            <input type="radio" name="stereo" value="on"
                [checked]="config.isStereo"
                (change)="config.isStereo = $event.target.checked" />
          </label>
          <label>
            off
            <input type="radio" name="stereo" value="off"
                [checked]="!config.isStereo"
                (change)="config.isStereo = !$event.target.checked" />
          </label>
        </div>
      </div>
    </form>
  `,
  styles: [`
    .fieldset {
      display: grid;
      grid-template: repeat(2, auto) / 1fr;
      padding: 3px;
    }

    .fieldset-content {
      display: grid;
      grid-template: 1fr / auto repeat(3, 100px);
    }

    .fieldset-content input {
      max-width: 30px;
    }
  `],
})
export class ControlsComponent {
  constructor(public config: ConfigService) {}

  public degToRad(deg: number) {
    return deg * Math.PI / 180;
  }

  public radToDeg(rad: number) {
    return rad * 180 / Math.PI;
  }
}
