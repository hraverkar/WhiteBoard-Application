import { TextNodeService } from './../../services/text-node.service';
import { ShapeService } from './../../services/shape.service';
import { Component, OnInit } from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shape: any = [];
  stage: Konva.Stage;
  layer: Konva.Layer;

  selectedButton: any = {
    circle: false,
    rectangle: false,
    line: false,
    undo: false,
    erase: false,
    text: false,
  };
  erase = false;
  transformers: Konva.Transformer[] = [];
  constructor(
    private shapeService: ShapeService,
    private textNodeService: TextNodeService
  ) {}

  ngOnInit(): void {
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight;
    this.stage = new Konva.Stage({
      container: 'container',
      width,
      height,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.addLineListener();
  }
  clearSelection() {
    Object.keys(this.selectedButton).forEach((key) => {
      this.selectedButton[key] = false;
    });
  }

  setSelection(typeOne: string) {
    this.selectedButton[typeOne] = true;
  }

  addShape(types: string) {
    this.clearSelection();
    this.setSelection(types);
    if (types === 'circle') {
      this.addCircle();
    } else if (types === 'line') {
      this.addLine();
    } else if (types === 'rectangle') {
      this.addRectangle();
    } else if (types === 'text') {
      this.addText();
    }
  }
  addText() {
    const text = this.textNodeService.tesxNode(this.stage, this.layer);
    this.shape.push(text.textNode);
    this.transformers.push(text.tr);
  }
  addRectangle() {
    const rectangle = this.shapeService.rectangle();
    this.shape.push(rectangle);
    this.layer.add(rectangle);
    this.stage.add(this.layer);
    this.addTransformerListeners();
  }
  addLine() {
    const newLocalOne = 'line';
    this.selectedButton[newLocalOne] = true;
  }
  addCircle() {
    const circle = this.shapeService.circle();
    this.shape.push(circle);
    this.layer.add(circle);
    this.stage.add(this.layer);
    this.addTransformerListeners();
  }
  addLineListener() {
    const component = this;
    let lastLine;
    let isPaint;
    // tslint:disable-next-line: only-arrow-functions
    this.stage.on('mousedown touchstart', function(e) {
      const newLocal = 'line';
      if (!component.selectedButton[newLocal] && !component.erase) {
        return;
      }
      isPaint = true;
      const pos = component.stage.getPointerPosition();
      const mode = component.erase ? 'erase' : 'brush';
      lastLine = component.shapeService.line(pos, mode);
      component.shape.push(lastLine);
      component.layer.add(lastLine);
    });
    // tslint:disable-next-line: only-arrow-functions
    this.stage.on('mousemove touchmove', function() {
      if (!isPaint) {
        return;
      }
      const pos = component.stage.getPointerPosition();
      const newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
      component.layer.batchDraw();
    });
  }
  addTransformerListeners() {
    const component = this;
    const tr = new Konva.Transformer();
    this.stage.on('click', function(e) {
      if (!this.clickStartShape) {
        return;
      }
      if (e.target._id === this.clickStartShape._id) {
        component.addDeleteListener(e.target);
        component.layer.add(tr);
        tr.attachTo(e.target);
        component.transformers.push(tr);
        component.layer.draw();
      } else {
        tr.detach();
        component.layer.draw();
      }
    });
  }
  addDeleteListener(shape) {
    const component = this;
    // tslint:disable-next-line: only-arrow-functions
    window.addEventListener('keydown', function(e) {
      // tslint:disable-next-line: deprecation
      if (e.keyCode === 46) {
        shape.remove();
        component.transformers.forEach((t) => {
          t.detach();
        });
        const selectedShape = component.shape.find((s) => s._id === shape._id);
        selectedShape.remove();
        e.preventDefault();
      }
      component.layer.batchDraw();
    });
  }
  undo() {
    const removedShape = this.shape.pop();
    this.transformers.forEach((t) => {
      t.detach();
    });
    if (removedShape) {
      removedShape.remove();
    }
    this.layer.draw();
  }
}
