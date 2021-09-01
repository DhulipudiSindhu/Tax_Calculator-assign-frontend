import {Component} from 'react';
import Header from '../Header';
import './index.css'

class Home extends Component{
    state={Bas:'',LTA:'', HRA: '', FA:'',Inv:'', Rent:'', cityType:'', Med:0, isMed:false,taxableInc:''}

    onChangeBas = event => {
        const {target} = event
        const {value} = target
        this.setState({Bas: value})
    }

    onChangeLTA = event => {
        const {target} = event
        const {value} = target
        this.setState({LTA: value})
    }
    onChangeHRA = event => {
        const {target} = event
        const {value} = target
        this.setState({HRA: value})
    }
    onChangeFA = event => {
        const {target} = event
        const {value} = target
        this.setState({FA: value})
    }

    onChangeInv = event => {
        const {target} = event
        const {value} = target
        this.setState({Inv: value})
    }

    onChangeRent = event => {
        this.setState({Rent: event.target.value})
    }

    onChangeCity = event =>{
        console.log(event.target.value)
        this.setState({cityType:event.target.value})
    }

    onChangeMedValue = event =>{
        console.log(event.target.value)
        this.setState({Med:event.target.value})
    }


    onChangeMedPremium =() => {
        const{Med}= this.state
        return(
            <input type="tel" placeholder="Medicial Allowance" value={Med} onChange={this.onChangeMedValue}/>
        )
    }

    onChangeMed = event =>{
        console.log(event.target.value)
        if (event.target.value === 'yes'){
            this.setState({isMed :true})
        }else{
            this.setState({isMed:false})
        }   
    }

    calculateTaxableIncome = () => {
        const{Bas, LTA, HRA, FA,Inv,Rent,cityType,Med} = this.state
        let BasVal = parseInt(Bas)
        let LTAVal = parseInt(LTA)
        let HRAVal = parseInt(HRA)
        let FAVal = parseInt(FA)
        let InvVal = parseInt(Inv)
        let RentVal = parseInt(Rent)
        let MedVal = parseInt(Med)
        let AppHRA
        let v1, v2;
        
        if (cityType === 'Metro'){
            v1 = (BasVal * 0.5)
            v2 = (RentVal - (0.1 * BasVal))
            AppHRA = Math.min(v1, v2, HRAVal)
        }else{
            v1 = (BasVal * 0.4)
            v2 = (RentVal - (0.1 * BasVal))
            AppHRA = Math.min(v1,v2,HRAVal)
        }
        console.log(BasVal,LTAVal,HRAVal,FAVal, AppHRA, InvVal,MedVal)    
        
        // console.log(typeof(BasVal))
        console.log(BasVal + LTAVal + HRAVal +FAVal - AppHRA - InvVal - MedVal)
        this.setState({taxableInc : ((BasVal + LTAVal + HRAVal +FAVal) - AppHRA - InvVal - MedVal), Bas:'',LTA:'', HRA: '', FA:'',Inv:'', Rent:'', cityType:'', Med:0})
    }

    submitForm = async event => {
        event.preventDefault()
        const{Bas, LTA, HRA, FA,Inv,Rent,cityType,Med} = this.state
        console.log(Bas,LTA, HRA, FA,Inv,Rent,cityType,Med)
        const confirmBox = window.confirm(
            `Confirm the details before clicking the ok ?
             1. Basic Salary: ${Bas}
             2. Leave Travel Allowance (LTA): ${LTA}
             3. House Rent Allowance(HRA): ${HRA}
             4. Food Allowance(FA): ${FA}
             5. Investment 80C: ${Inv}
             6. Actual Rent: ${Rent}
             7. Residence City Type: ${cityType}
             8. Mediclaim Policy Premium: ${Med}
            `
          )
          if (confirmBox === true) {  
        const url = "http://localhost:3000/"
        const options = {
         headers:{
           "content-type": "application/json"
         },
         method: "POST",
         body: JSON.stringify({
           bas:Bas,
           lta:LTA,
           hra:HRA,
           fa:FA,
           inv:Inv,
           rent:Rent,
           city_type:cityType,
           med:Med,
         })
      }
      const response = await fetch(url, options);
      console.log(response);
      this.calculateTaxableIncome()
    }    
    }
    
    
    render(){
        const{Bas, LTA, HRA, FA,Inv,Rent,isMed,taxableInc} = this.state
        console.log(isMed)
        return(
            <>
            <Header/>
            <div className="home-container">
                <form className="form-conatiner" onSubmit={this.submitForm}>
                    <h1 className="form-heading">Calculate the User's Taxable Income</h1>
                    <div className="responsive-container">
                        <div>
                            <div className="form-element">
                                <label htmlFor="basic" className="label-text">
                                    Basic Salary
                                </label>
                                <input type="tel"
                                id="basic"
                                placeholder="Enter the basic salary"
                                className="input-field"
                                value ={Bas}
                                onChange={this.onChangeBas}/>
                            </div>
                            <div className="form-element">
                                <label htmlFor="lta" className="label-text">
                                    Leave Travel Allowance(LTA)
                                </label>
                                <input type="tel"
                                id="lta"
                                placeholder="LTA"
                                className="input-field"
                                value ={LTA}
                                onChange={this.onChangeLTA}/>
                            </div>
                            <div className="form-element">
                                <label htmlFor="hra" className="label-text">
                                    House Rent Allowance(HRA)
                                </label>
                                <input type="tel"
                                id="hra"
                                placeholder="HRA"
                                className="input-field"
                                value ={HRA}
                                onChange={this.onChangeHRA}/>
                            </div>
                            <div className="form-element">
                                <label htmlFor="fa" className="label-text">
                                    Food Allowance(FA)
                                </label>
                                <input type="tel"
                                id="fa"
                                placeholder="FA"
                                className="input-field"
                                value ={FA}
                                onChange={this.onChangeFA}/>
                            </div>
                        </div>
                        <div>
                            <div className="form-element">
                                <label htmlFor="inv" className="label-text">
                                    Investment 80C
                                </label>
                                <input type="tel"
                                id="inv"
                                placeholder="inv"
                                className="input-field"
                                value ={Inv}
                                onChange={this.onChangeInv}/>
                            </div>
                            <div className="form-element">
                                <label htmlFor="rent" className="label-text">
                                    Actual Rent
                                </label>
                                <input type="tel"
                                id="rent"
                                placeholder="Rent"
                                className="input-field"
                                value ={Rent}
                                onChange={this.onChangeRent}/>
                            </div>
                            <div className="form-element-1">
                                <h1 className="city-heading">Residence City Type</h1>
                                <input type="radio"
                                id="metro-city"
                                className="input-field" 
                                value="Metro"
                                name="city"
                                onChange={this.onChangeCity}
                                />
                                <label htmlFor="metro-city" className="label-text radio">Metro</label>
                                <input type="radio"
                                id="non-metro-city"
                                className="input-field" 
                                value="Non-Metro"
                                name="city"
                                onChange={this.onChangeCity}
                                />
                                <label htmlFor="non-metro-city" className="label-text radio">Non-Metro</label>
                            </div>
                            <div className="form-element-1">
                                <h1 className="city-heading">Medical Premium</h1>
                                <input type="radio"
                                id="medical-yes"
                                className="input-field" 
                                value="yes"
                                name="med"
                                onChange={this.onChangeMed}
                                />
                                <label htmlFor="medical-yes" className="label-text radio">Yes</label>
                                <input type="radio"
                                id="medicial-no"
                                className="input-field" 
                                value="no"
                                name="med"
                                onChange={this.onChangeMed}
                                />
                                <label htmlFor="medical-no" className="label-text radio">No</label>
                                {isMed ? this.onChangeMedPremium():null}
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                    <button type="submit" className="submit-button">
                        <i class="fas fa-calculator"></i>
                        <span className="icon-cal">Calculate </span>
                    </button>
                    </div>
                </form>
                {taxableInc ? <h1 className="tax-heading">Taxable Income : {taxableInc}</h1> : null}
            </div>
            </>
        )
    }
}
export default Home