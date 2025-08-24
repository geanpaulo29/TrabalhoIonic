import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons'
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato.service';

addIcons({add:add})

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  contatos: Contato[];

  constructor(private router: Router,
    private contatoService: ContatoService
  ) { 
    this.contatos = this.contatoService.contatos;
  }

  formatarData(data: string): string {
    if (!data) return '';
    
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    
    return `${dia}/${mes}/${ano}`;
  }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"])
    
  }
}
