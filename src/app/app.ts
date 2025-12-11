import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Hero } from "./components/hero/hero";
import { Rates } from "./components/rates/rates";
import { Categories } from "./components/categories/categories";
import { Blog } from "./components/blog/blog";
import { Footer } from "./components/footer/footer";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Header, Hero, Rates, Categories, Blog, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  //protected readonly title = signal('calc-home-iq');  
  title = 'HomeIQ';
}
