function moveFarmers() {        
    /*get all players positions
     * and define new man,woman positions
     * At the beginning of the game man makes one step 
     * to right and woman makes one step to left
     * so the have positions (2,3) and woman (2,4).
     * so the are neighbours and one should step up or down
     * The next position of man and woman depends of
     * position of hen:
     *  - if hen.row = 3 (>2) then man.row =1 (<2)     
     *  - if hen.row =1 (<2) then man.row =3 (>2)
     * Rules for man:
     * Let its position is (i,j)
     * 1.If distance from hen is equal to 1
     * then catch it and return
     * 2.If woman position is (i,j+1)
     *  then next man position is (i+1,j)
     *  if i<5 otherwise it is (i-1,j)
     * 3.Let hen position is (m, n)  
     *   The next position of man will be (i1,j1)
     *   where or i1=+-1, j1=j or i1=i,j1=j+1
     *   Rules:
     *   3.0.if distance=1 than catch the hen
     *   3.1.the next position  must decrease the distance
     *   between man and hen .
     *   3.2.If there are 2 such positions then
     *   to choose the position by diagonal
     *   that is abs(i1-i)=j-j1     
     * **********************
     * Rules for woman
     * Let its postion is (i,j)
     * 1.If distance from rooster is equal to 1
     * then catch it and return
     * 2.If rooster position is (m, n)  where
     *   j-n>=2 then next woman position is
     *   (i,j-1)
     */
    processGameStart()
    
    if (manCell != null) {

        moveman();
        advanceFigureIndex();
    }
    if (womanCell != null) {
        setTimeout(movewoman,1000);        
    }
    
}
function moveman() {
    if (checkHenCatch()) {
        henCatched = true;
        document.getElementById("txtMessage").value =
            messages[6]; // "Hen Catched!";
        manCell.innerHTML = "";
        henCell.innerHTML = "";
        manCell = null;
        henCell = null;
        return;
    }
    let [i, j] = [parseInt(manCell.dataset.row),
        parseInt(manCell.dataset.col)];
    //let newi = i;
    //let newj = j;
    let [iw, jw] = [0, 0];
    if (womanCell != null) {
        [iw, jw] = [parseInt(womanCell.dataset.row),
        parseInt(womanCell.dataset.col)];
    }
    let [m, n] = [parseInt(henCell.dataset.row),
    parseInt(henCell.dataset.col)];
    if (i==2 && j == 2 && iw==2 && jw == 5) //first move
        manCell = cellsarr[i][j+1];
    else
    {
        if (jw == j + 1)//second move
        {
            if (m > 2)
                manCell = cellsarr[i - 1][j];
            else
                manCell = cellsarr[i + 1][j];
        }
        else //common situation after 2 moves
        //if m>=2 then i<=2 and if m<=2 then i>=2
        {
            
            //if (m >= 2)
            //{ //i could be increased or j could be increased
            //    let d1 = m - (i + 1) + n - j;
            //    let d2 = m - i + n - (j + 1);
            //    if (d2 > d1)
            //        newj = j + 1;
            //    if (d1 > d2)
            //        newi = i + 1;
            //    if (d1 == d2)
            //    { //check m-newi==n-newj   abs(i1-i)=j-j1
            //        if (m - (i + 1) == n - j)
            //            newi = i + 1;
            //        else
            //            newj = j + 1;
            //    }
            //}           
            let [newi,newj]= getNewFarmerCoordinates(i, j, m, n)
            manCell = cellsarr[newi][newj];
        }
    }

        //if (n - j >= 2) {
        //     manCell = cellsarr[i][j + 1];

        //}
        //else {
        //    if (m - i >= 2)
        //        manCell = cellsarr[i + 1][j];
        //    else
        //        manCell = cellsarr[i -1][j];
        //}
    cellsarr[i][j].innerHTML = "";
    manCell.innerHTML = figures[0].symbol;

}

function movewoman() {
    let [i, j] = [parseInt(womanCell.dataset.row),
    parseInt(womanCell.dataset.col)];
    if (checkRoosterCatch()) {
        roosterCatched = true;
        document.getElementById("txtMessage").value =
            messages[7];
        womanCell.innerHTML = "";
        roosterCell.innerHTML = "";
        womanCell = null;
        roosterCell = null;
    }
    else {
        

        let [m, n] = [parseInt(roosterCell.dataset.row),
        parseInt(roosterCell.dataset.col)];

        if (j - n >= 2) {
            womanCell = cellsarr[i][j - 1];
        }
        else {
            if (m - i >= 2)
                womanCell = cellsarr[i + 1][j];
            else
                womanCell = cellsarr[i - 1][j];
        }
        cellsarr[i][j].innerHTML = "";
        womanCell.innerHTML = figures[1].symbol;
    }
   
    advanceFigureIndex();
}
function getNewFarmerCoordinates(i,j,m,n)
{
    let newi = i;
    let newj = j;
    if (m >= 2) { //i could be increased or j could be increased
        let d1 = m - (i + 1) + n - j;
        let d2 = m - i + n - (j + 1);
        if (d2 > d1)
            newj = j + 1;
        if (d1 > d2)
            newi = i + 1;
        if (d1 == d2) { //check m-newi==n-newj   abs(i1-i)=j-j1
            if (m - (i + 1) == n - j)
                newi = i + 1;
            else
                newj = j + 1;
        }
    }
    else
    {
        let d1 = (i - 1)-m + n - j;
        let d2 = i - m + n - (j + 1);
        if (d2 > d1)
            newj = j + 1;
        if (d1 > d2)
            newi = i - 1;
        if (d1 == d2) { //check m-newi==n-newj   abs(i1-i)=j-j1
            if ((i - 1) - m == n - j)
                newi = i - 1;
            else
                newj = j + 1;
        }
    }
    return [newi, newj];
}