class CustomCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._prefix = 'dev'; // Default prefix
        this._selectedSensor = '';
        this.entities = [];
        this.entityIds = [];
        this.sensors = [];
    }

    set hass(hass) {
        this._hass = hass;
        
        this.entities = Object.keys(hass.states)
            .filter(entityId => /sensor\.roomsense_iq_.*presence_.*/.test(entityId))
            .map(entityId => hass.states[entityId]);
            
            
        this.entityIds = this.entities.map(entity => entity.entity_id);
        this.sensors = Object.keys(hass.states)
            .filter(entityId => /sensor\.roomsense_iq_.*presence_.*/.test(entityId))
            .map(entityId => {
                const entity = hass.states[entityId];
                const match = entityId.match(/sensor\.roomsense_iq_(.*?)presence_(.*)/);
                if (match) {
                    entity.prefix = match[1].replace(/_+$/, '');
                    entity.suffix = match[2];
                }
                return entity;
            });        
            
        this.entityTabs = this.sensors.map(entity => ({
            id: `${entity.suffix}`,
            title: `${(entity.prefix) || "new sensor"} `
        }));
        
        if (this.sensors.length > 0 && (this._selectedSensor === '' || this._selectedSensor == undefined )) {
            this._selectedSensor = this.sensors[0].suffix;
            this._prefix = this.sensors[0].prefix;
            console.log(`test ${this._selectedSensor}`);
        }

        this.updateCard();
        this.updateSensorId(this._selectedSensor);
        this.updateActiveTab();
    }

addEventListeners() {
    const tabs = this.shadowRoot.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            this.updateSensorId(tab.id);
             console.log(`tab.id ${tab.id}`);
        });
    });
}

    setConfig(config) {
        this.config = config;
        this._selectedSensor=config.id;
        this._prefix = config.prefix;
        this.render();
    }

    render() {
        if (!this.content) {
            const card = document.createElement('ha-card');
            this.content = document.createElement('div');
            this.content.className = 'custom-card-rs';
            this.content.style.padding = '16px';
            card.appendChild(this.content);
            this.shadowRoot.appendChild(card);

            this.content.innerHTML = `
                <style>
                    .custom-card-rs {
                        display: block;
                    }
                    .custom-card {
                        display: flex;
                        gap: 16px;
                    }
                    .custom-card1 {
                        display: flex;
                        gap: 16px;
                    }
                    .custom-card11 {
                        display: grid;
                        grid-template-columns: repeat(8, 1fr);
                        grid-template-rows: auto auto auto;
                        gap: 16px;
                    }
                    .custom-card12 {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        grid-template-rows: auto auto auto;
                        gap: 16px;
                    }
                    .card-section {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #E0F7FA;
                        border-radius: 10px;
                        padding: 16px;
                        font-size: 20px;
                        color: black; 
                        flex-direction: column;
                    }
                    .card-section.tab {
                        background-color: #32afb4;
                        color: white;
                        cursor: pointer;
                    }
                    .card-section.tab.active {
                        background-color: #007B8A; /* Highlight active tab */
                    }
                    .card-section img {
                        width: 50px;
                        height: 50px;
                        margin-right: 16px;
                    }
                     .custom-card-left {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 16px;
                        flex: 1;  
                        background: #c6eaea;
                        padding: 10px;
                        border-radius: 10px;
                    }
                    .custom-card-right {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 16px;
                        flex: 1;
                        background: #c6eaea;  
                        padding: 10px;
                        border-radius: 10px;
                    }
                    .custom-card-left-t {
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 16px;
                      flex: 1;  
                      padding: 10px;
                      border-radius: 10px;
                    }
                    .custom-card-right-t {
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 16px;
                      flex: 1;  
                      padding: 10px;
                      border-radius: 10px;
                    }
                    p{
                        font-size: 20px;
                     }
    
                </style>
                <div class="custom-card-rs">
                    <img src="https://raw.githubusercontent.com/roomsensr/install/main/logo_transparent_background.png" style="height:90px"/>
                    
                    <div class="custom-card1">
                        <div class="custom-card11" id="custom-card11" style="width:70%">
                            <div class="card-section tab" id="iq_dev-tab">iq_dev</div>
                        </div>
                    <div class="custom-card12" style="width:30%">
                    <div>
                         <p style="margin:5px;  align-content: center;  justify-content: center;display: flex;">Fall Detection</p>
                        
                        <div class="card-section" id="activity-time11">
                            <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/5.png"/>
                            Activity Time
                        </div>
                    </div>
                    </div>
                </div>
                
            <div class="custom-card">
                <div class="custom-card-left-t">
                        <p>Vital Signs</p>          
                </div>
                <div class="custom-card-right-t">
                        <p>Activites</p>          
                </div>      
            </div>
                <div class="custom-card">
                
                
    
    <div class="custom-card-left">
                    <div class="card-section" id="heart-rate">
                        <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/7.png"/>
                        Heart Rate
                    </div>
                    <div class="card-section" id="respiratory-rate">
                        <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/2.png"/>
                        Respiratory Rate
                    </div>
                    
    </div>
    
    <div class="custom-card-right">
                    <div class="card-section" id="walk-time">
                        <img src="https://img.icons8.com/ios-filled/50/000000/walking.png"/>
                        Walk Time
                    </div>
                    <div class="card-section" id="fall-detection">
                        <img src="https://img.icons8.com/ios-filled/50/000000/fall.png"/>
                        Fall Detection
                    </div>
                    <div class="card-section" id="sleep-time">
                        <img src="https://img.icons8.com/ios-filled/50/000000/sleeping.png"/>
                        Sleep Time
                    </div>
    </div>
                </div>
                </div>
            `;

        }
        this.updateCard();
    }

    updateSensorId(selectedSensor) {
        this._selectedSensor = selectedSensor;  
        
        const sensor = this.sensors.find(sensor => sensor.suffix == selectedSensor);
        if (sensor) {
            this._prefix = sensor.prefix;
            this._suffix = sensor.suffix;
            
            }

        this.updateActiveTab();
        this.updateCard();
        this.updateActiveTab();
    }
updateActiveTab() {
    const tabs = this.shadowRoot.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTabId = `${this._selectedSensor}`;

    const activeTab = Array.from(tabs).find(tab => tab.id === activeTabId);

    if (activeTab) {
        activeTab.classList.add('active');
    } 
}

    updateCard() {
        if (!this._hass || !this.config) return;

        const entityPrefix = this._prefix ? `${this._prefix}_` : '';
        const entitySuffix = this._suffix;
        
       
        const heartRate = this._hass.states[`sensor.roomsense_iq_${entityPrefix}heart_rate_${entitySuffix}`] || { state: 'N/A' };

        const respiratoryRate = this._hass.states[`sensor.roomsense_iq_${entityPrefix}breathing_rate_${entitySuffix}`] || { state: 'N/A' };
        const activityTime = this._hass.states[`sensor.${entityPrefix}_activity_time`] || { state: 'N/A' };
        const walkTime = this._hass.states[`sensor.roomsense_iq_${entityPrefix}presence_${entitySuffix}`] || { state: 'N/A' };
        const sleepTime = this._hass.states[`sensor.roomsense_iq_${entityPrefix}sleep_${entitySuffix}`] || { state: 'N/A' };
        const fallDetection = this._hass.states[`sensor.roomsense_iq_${entityPrefix}walk_${entitySuffix}`] || { state: 'N/A' };
        const fall = this._hass.states[`sensor.roomsense_iq_${entityPrefix}fall_${entitySuffix}`] || { state: 'N/A' };
       
        this.shadowRoot.getElementById('heart-rate').innerHTML = `
            <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/7.png"/>
            ${heartRate.state} <br>BPM
            <br>
        `;
        this.shadowRoot.getElementById('respiratory-rate').innerHTML = `
            <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/2.png"/>
            ${respiratoryRate.state} <br>BPM
        `;
        this.shadowRoot.getElementById('walk-time').innerHTML = `
            <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/1.png"/>
            ${walkTime.state}
        `;
        this.shadowRoot.getElementById('fall-detection').innerHTML = `
            <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/3.png"/>
            ${fallDetection.state}
        `;
        this.shadowRoot.getElementById('sleep-time').innerHTML = `
            <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/6.png"/>
            ${sleepTime.state}
        `;
        
        
            const tElement = this.shadowRoot.getElementById('custom-card11');
            
            tElement.innerHTML = this.entityTabs.map(tab => `
            <div class="card-section tab" id="${tab.id}">${tab.title}</div>`).join('');
        
      
        
            const activityTimeElement = this.shadowRoot.getElementById('activity-time11');
                    
        if (fall.state == 1) {
            activityTimeElement.innerHTML = `
                <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/4.png"/>
                 <br>
                <br>
            `;
        } else {
            activityTimeElement.innerHTML = `
                <img src="https://raw.githubusercontent.com/roomsensr/roomsense-card/main/5.png"/>
               <br>
                <br>
            `;
        }
        
        
    this.addEventListeners(); 
       
        
        
        
    }

    getCardSize() {
        return 3;
    }
}

customElements.define('rs-custom-card', CustomCard);
