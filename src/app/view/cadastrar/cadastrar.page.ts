import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular'
import { FormsModule } from '@angular/forms';
import { AlertController, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ContatoService } from 'src/app/service/contato.service';
import { Contato } from 'src/app/model/contato';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule, FormsModule]
})
export class CadastrarPage implements OnInit {
  nome!: string;
  telefone!: string;
  dataNascimento!: string;
  maxDate: string;
  genero!: string;

  constructor(private alertController: AlertController, private router:Router, private contatoService: ContatoService) {
    let hoje = new Date();
    this.maxDate = hoje.toISOString().split('T')[0]
    addIcons({ arrowBack });
  }

  ngOnInit() {  
  }

  formatarTelefone(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    
    if (valor.length <= 10) {
      valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    this.telefone = valor;
    event.target.value = valor;
  }

  validarTecla(event: KeyboardEvent) {
    const tecla = event.key;
    const permitidos = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight', 'Clear', 'Copy', 'Paste'];
    
    if (permitidos.includes(tecla)) {
      return true;
    }
    
    if (tecla >= '0' && tecla <= '9') {
      return true;
    }
    
    event.preventDefault();
    return false;
  }

  cadastrar(){
    if(!this.validar(this.nome) || !this.validar(this.telefone)){
      this.presentAlert("Erro ao cadastar", "Erro ao cadastrar")
      return
    }
    this.presentAlert("Sucesso", "Contato Cadastrado")
    let contato: Contato = new Contato(this.nome, this.telefone, this.dataNascimento, this.genero);
    this.contatoService.create(contato)
    this.router.navigate(["/home"])
  }

  private validar(campo:any) : boolean{
    if(!campo){
      return false;
    }
    return true;
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
