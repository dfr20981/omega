<?php
    require_once '../Controller/dbExec.php';
	require_once ('Classes/PHPExcel.php');
	
    $query="CALL sp_viewCatego_Id(".$_GET['id'].");";
        //echo $query;
    $msg=dbExec::exec($query);//clase read QueryExe
    
    //echo $msg;

    $js= json_decode($msg);
    $vc=$js->catego;
    $lmt=count($vc);
    $list=$js->arts;

    $catego_nom='Todo';
    if($lmt==1){
        $catego_nom=$vc[0]->nom;
    }

    $familias= array();
    foreach ($list as &$vl1) {
        $mrc=$vl1->fam;            
        $ok=true;
        foreach ($familias as &$vl2) {
            if($vl2==$mrc){
                $ok=false;
            }
        }
        if($ok){
           array_push($familias,$mrc);
        }                                        
    }
    asort($familias);
    
    $vec = array();
    foreach ($familias as &$vl3){
        $semi = array();
        foreach($list as &$vl4){
            if($vl4->fam==$vl3){
                if($vl4->cant>0){
                    array_push($semi,$vl4);         
                }
            }
        }
        usort($semi, function($a, $b){
            return strcmp($a->nom, $b->nom);
        }); 

        foreach($semi as &$vl5){
            array_push($vec,$vl5);     
        }    
    }    
    /*
        A001182--comex
        A001183--sika
    */
    $limt=count($vec);
    //$limt=0;
    //echo $limt;


    // Crea un nuevo objeto PHPExcel
	$objPHPExcel = new PHPExcel();

     $estilo = array(
        'font'  => array(
            'bold'  => true,
            'size'  => 12,
            'name'  => 'Arial Narrow',
            'color' => array('rgb' => 'FFFFFF')
        ));

	
	$objPHPExcel->getDefaultStyle()->getFont()->setName('Arial');
	$objPHPExcel->getDefaultStyle()->getFont()->setSize(10);

    $objPHPExcel->getDefaultStyle()->getAlignment()->setWrapText(true);
/*    
    $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(7);

	$objPHPExcel->getActiveSheet()->mergeCells('F2:L2');
	$objPHPExcel->getActiveSheet()->mergeCells('F3:L3');
	$objPHPExcel->getActiveSheet()->mergeCells('F4:L4');
	$objPHPExcel->getActiveSheet()->mergeCells('F5:L5');

	$objPHPExcel->getActiveSheet()->getStyle('F2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('F3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('F4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('F5')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

	$objPHPExcel->getActiveSheet()->setCellValue('F2','');
	$objPHPExcel->getActiveSheet()->setCellValue('F3','');
	$objPHPExcel->getActiveSheet()->setCellValue('F4','');
	$objPHPExcel->getActiveSheet()->setCellValue('F5','');

*/
    $ini=1;    
    $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(20);
    $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(58);
    $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(22);
    $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(10);
    /*
    $objPHPExcel->getActiveSheet()->mergeCells('B'.$ini.':J'.$ini);
    $objPHPExcel->getActiveSheet()->mergeCells('M'.$ini.':N'.$ini);
    $objPHPExcel->getActiveSheet()->mergeCells('O'.$ini.':P'.$ini);
    */
    $objPHPExcel->getActiveSheet()->getStyle('A'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('B'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

    $objPHPExcel->getActiveSheet()->getStyle('C'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('D'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('E'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('F'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('G'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

    $objPHPExcel->getActiveSheet()->getStyle('A'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('A'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('B'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('B'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('C'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('C'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('D'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('D'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('E'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('E'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('F'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('F'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    /**/
    $objPHPExcel->getActiveSheet()->getStyle('G'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('G'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    /**/
    $objPHPExcel->getActiveSheet()->setCellValue('A'.$ini,'#');
    $objPHPExcel->getActiveSheet()->setCellValue('B'.$ini,'Familia');
    $objPHPExcel->getActiveSheet()->setCellValue('C'.$ini,'Articulo');
    $objPHPExcel->getActiveSheet()->setCellValue('D'.$ini,'Cant.');
    $objPHPExcel->getActiveSheet()->setCellValue('E'.$ini,'Uni');
    $objPHPExcel->getActiveSheet()->setCellValue('F'.$ini,'Marca');
    $objPHPExcel->getActiveSheet()->setCellValue('G'.$ini,'Lugar');
/**/

    $ini=$ini+1;
    $fam_a='';
    for ($d=0; $d<$limt; $d++) {    
        $obj=$vec[$d];
        /*
        $objPHPExcel->getActiveSheet()->mergeCells('B'.($d+$ini).':J'.($d+$ini));
        $objPHPExcel->getActiveSheet()->mergeCells('M'.($d+$ini).':N'.($d+$ini));
        $objPHPExcel->getActiveSheet()->mergeCells('O'.($d+$ini).':P'.($d+$ini));
        */
        $objPHPExcel->getActiveSheet()->getStyle('A'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->getActiveSheet()->getStyle('B'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

        $objPHPExcel->getActiveSheet()->getStyle('D'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->getActiveSheet()->getStyle('E'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->getActiveSheet()->getStyle('F'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->getActiveSheet()->getStyle('G'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        

        $objPHPExcel->getActiveSheet()->setCellValue('A'.($ini+$d),''.($d+1));
        //if($fam_a!=$obj->fam){
        $objPHPExcel->getActiveSheet()->setCellValue('B'.($ini+$d),''.$obj->fam);
        //}
        $fam_a=$obj->fam;
        $objPHPExcel->getActiveSheet()->setCellValue('C'.($ini+$d),'('.$obj->id.') '.$obj->nom);
        $objPHPExcel->getActiveSheet()->setCellValue('D'.($ini+$d),''.$obj->cant);
        $objPHPExcel->getActiveSheet()->setCellValue('E'.($ini+$d),''.$obj->uni);
        $objPHPExcel->getActiveSheet()->setCellValue('F'.($ini+$d),''.$obj->marcas);
        $objPHPExcel->getActiveSheet()->setCellValue('G'.($ini+$d),''.$obj->pos);
        
    }
/**/
	// Nombramos la hoja
	$objPHPExcel->getActiveSheet()->setTitle($catego_nom);
    $objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE); 
    /*
    $objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4); 
    //PARA EL TIPO DE HOJA PARA LA IMPRESIÓN
    */
    $objPHPExcel->getActiveSheet()->getPageMargins()->setTop(0.1); 
    $objPHPExcel->getActiveSheet()->getPageMargins()->setRight(0.05); 
    $objPHPExcel->getActiveSheet()->getPageMargins()->setLeft(0.05); 
    $objPHPExcel->getActiveSheet()->getPageMargins()->setBottom(0.1); 


	// Elegimos en que hoja se abre el Excel
	$objPHPExcel->setActiveSheetIndex(0);

	// indicar que se envia un archivo de Excel.
	header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	header('Content-Disposition: attachment;filename="catalogo_omega_'.$catego_nom.'.xlsx"');
	header('Cache-Control: max-age=0');

	$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
	$objWriter->save('php://output');
	
	
	exit;
	
/**/
?>

