# RoomSense Card

[RoomSense Card](https://github.com/roomsensr/roomsense-card/) is a custom card for Home Assistant's Lovelace UI.

## Installation

### Step 1: Add Custom Repository to HACS

1. Open Home Assistant.
2. Navigate to **HACS** (Home Assistant Community Store).
3. Click on the three dots menu (•••) in the top right corner and select **Custom repositories**.
4. Add the following URL to the **Repository** field: `https://github.com/roomsensr/roomsense-card/`.
5. Select **Lovelace** as the category.
6. Click **Add**.

### Step 2: Install RoomSense Card

1. After adding the custom repository, go to the **Frontend** section in HACS.
2. Find **Room Sense Card** in the list and click **Install**.
3. Follow the prompts to complete the installation.

Example configuration:

```yaml
type: custom:rs-custom-card
```
## Panel Mode 

The Room Sense Card is designed to work optimally in **panel mode**. Panel mode allows the card to take up the full width of the dashboard. 

To enable panel mode for your Lovelace view:

1. Navigate to your Lovelace dashboard.
2. Click on the three dots menu (•••) in the top right corner and select **Edit Dashboard**.
3. Click on the view tab (e.g., **Home**, **Overview**) you want to edit.
4. Click the pencil icon next to the view name to edit view settings.
5. Select View type as **Panel** 
6. Click **Save**.
